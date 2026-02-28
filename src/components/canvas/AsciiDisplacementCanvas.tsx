"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  applyLensDistortion,
  computeDpr,
  layeredField,
  mapIntensityToChar,
  shouldAnimate,
} from "@/lib/canvas/asciiEngine";
import { AsciiDisplacementCanvasProps, LensState } from "@/types/site";

const AsciiDisplacementCanvas = ({ config, title, subtitle }: AsciiDisplacementCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const visibilityRef = useRef(true);
  const targetLensRef = useRef({ x: 0, y: 0, active: false });

  const [lens, setLens] = useState<LensState>({
    x: 0,
    y: 0,
    radius: config.lensRadius,
    active: false,
    dragging: false,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  const chars = useMemo(() => config.charset.split(""), [config.charset]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    const handleVisibility = () => {
      visibilityRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      const dpr = computeDpr(window.devicePixelRatio || 1, config.dprCap);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.textBaseline = "middle";
      context.font = "500 12px 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillStyle = "rgba(25, 25, 25, 0.25)";
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    resize();

    let currentLensX = width * 0.5;
    let currentLensY = height * 0.66;

    const draw = (time: number) => {
      if (shouldAnimate(reducedMotion, visibilityRef.current)) {
        frameRef.current += 1;
      }

      const shouldRunFrame = reducedMotion ? frameRef.current === 0 : true;
      if (!shouldRunFrame) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (wrapper) {
        wrapper.dataset.frame = String(frameRef.current);
      }

      context.clearRect(0, 0, width, height);

      const targetX = targetLensRef.current.x || width * 0.5;
      const targetY = targetLensRef.current.y || height * 0.66;
      const active = targetLensRef.current.active;

      currentLensX += (targetX - currentLensX) * 0.16;
      currentLensY += (targetY - currentLensY) * 0.16;

      setLens((prev) => {
        const dragging = prev.dragging;
        if (
          Math.abs(prev.x - currentLensX) < 0.2 &&
          Math.abs(prev.y - currentLensY) < 0.2 &&
          prev.active === active
        ) {
          return prev;
        }
        return { ...prev, x: currentLensX, y: currentLensY, active, dragging };
      });

      const cell = config.cellSize;
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = col * cell + cell * 0.5;
          const y = row * cell + cell * 0.5;

          let sampleX = x / width;
          let sampleY = y / height;
          let emphasis = 0;

          if (active) {
            const distortion = applyLensDistortion(x, y, currentLensX, currentLensY, config.lensRadius);
            sampleX = distortion.x / width;
            sampleY = distortion.y / height;
            emphasis = distortion.strength;
          }

          const fieldValue = layeredField(sampleX, sampleY, time, config);
          const intensity = Math.min(1, fieldValue + emphasis * 0.32);
          const char = mapIntensityToChar(intensity, chars.join(""));

          context.globalAlpha = 0.1 + intensity * 0.75;
          context.fillStyle = `rgba(20, 20, 20, ${0.15 + intensity * 0.7})`;
          context.fillText(char, x, y);
        }
      }

      if (active) {
        context.globalAlpha = 1;
        context.strokeStyle = "rgba(20, 20, 20, 0.55)";
        context.lineWidth = 1;
        context.beginPath();
        context.arc(currentLensX, currentLensY, config.lensRadius, 0, Math.PI * 2);
        context.stroke();
      }

      // Decorative fade below subtitle for readability.
      const gradient = context.createLinearGradient(0, height * 0.45, 0, height * 0.9);
      gradient.addColorStop(0, "rgba(237, 237, 237, 0)");
      gradient.addColorStop(1, "rgba(237, 237, 237, 0.92)");
      context.fillStyle = gradient;
      context.fillRect(0, height * 0.45, width, height * 0.55);

      context.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [chars, config, reducedMotion]);

  const updateTarget = (clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    targetLensRef.current.x = clientX - rect.left;
    targetLensRef.current.y = clientY - rect.top;
  };

  return (
    <div
      ref={wrapperRef}
      className="ascii-canvas"
      data-testid="ascii-canvas-root"
      onPointerEnter={(event) => {
        targetLensRef.current.active = true;
        updateTarget(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        updateTarget(event.clientX, event.clientY);
      }}
      onPointerLeave={() => {
        targetLensRef.current.active = false;
        setLens((prev) => ({ ...prev, dragging: false }));
      }}
      onPointerDown={(event) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        wrapper.setPointerCapture(event.pointerId);
        targetLensRef.current.active = true;
        updateTarget(event.clientX, event.clientY);
        setLens((prev) => ({ ...prev, dragging: true }));
      }}
      onPointerUp={(event) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        wrapper.releasePointerCapture(event.pointerId);
        setLens((prev) => ({ ...prev, dragging: false }));
      }}
      aria-hidden="true"
      role="presentation"
    >
      <canvas ref={canvasRef} className="ascii-canvas__canvas" data-testid="ascii-canvas" />

      <div
        className="ascii-canvas__lens"
        data-testid="ascii-lens"
        data-active={lens.active ? "true" : "false"}
        data-dragging={lens.dragging ? "true" : "false"}
        style={{
          width: `${lens.radius * 2}px`,
          height: `${lens.radius * 2}px`,
          left: `${lens.x - lens.radius}px`,
          top: `${lens.y - lens.radius}px`,
          opacity: lens.active ? 1 : 0,
        }}
      />

      <div className="ascii-canvas__a11y-copy">
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default AsciiDisplacementCanvas;
