"use client";

import { useEffect, useRef, useState } from "react";

import { computeDpr, shouldAnimate } from "@/lib/canvas/asciiEngine";
import { AsciiDisplacementCanvasProps, LensState } from "@/types/site";

const AsciiDisplacementCanvas = ({ config, title, subtitle }: AsciiDisplacementCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const visibilityRef = useRef(true);
  const targetLensRef = useRef<{ x: number | null; y: number | null; active: boolean }>({
    x: null,
    y: null,
    active: false,
  });

  const [lens, setLens] = useState<LensState>({
    x: 0,
    y: 0,
    radius: config.lensRadius,
    active: false,
    dragging: false,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

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
    let asciiColor = "100, 100, 100";
    let asciiBinaryColor = "0, 0, 0";
    const lensEffectRadius = 150;
    const densityChars =
      " .'`^,:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    const simpleNoise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t) +
        Math.sin(x * 0.01 - t) * Math.cos(y * 0.12) * 0.5
      );
    };

    const resize = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      const dpr = computeDpr(window.devicePixelRatio || 1, config.dprCap);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.textBaseline = "middle";
      context.font = `${config.cellSize}px monospace`;
      context.textAlign = "center";
      context.fillStyle = `rgba(${asciiColor}, 1)`;
    };

    const updatePalette = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const nextAsciiColor = rootStyle.getPropertyValue("--color-ascii").trim();
      const nextAsciiBinaryColor = rootStyle.getPropertyValue("--color-ascii-binary").trim();
      asciiColor = nextAsciiColor || "100, 100, 100";
      asciiBinaryColor = nextAsciiBinaryColor || "0, 0, 0";
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    updatePalette();
    resize();

    const themeObserver = new MutationObserver(() => {
      updatePalette();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let currentLensX = width * 0.5;
    let currentLensY = height * 0.66;

    const draw = () => {
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

      const targetX = targetLensRef.current.x ?? width * 0.5;
      const targetY = targetLensRef.current.y ?? height * 0.66;
      const active = targetLensRef.current.active;

      currentLensX += (targetX - currentLensX) * 0.03;
      currentLensY += (targetY - currentLensY) * 0.03;

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
      const time = timeRef.current;

      for (let row = 0; row < rows; row += 1) {
        if (row < rows * 0.4) continue;

        for (let col = 0; col < cols; col += 1) {
          const posX = col * cell;
          const posY = row * cell;
          const dx = posX - targetX;
          const dy = posY - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const normalizedY = (rows - row) / rows;
          const noiseVal = simpleNoise(col, row, time * 0.5);
          const mountainHeight =
            0.3 + Math.sin(col * 0.05 + time * 0.1) * 0.1 + Math.cos(col * 0.2) * 0.05;

          let char = "";
          let alpha = 0;

          if (normalizedY < mountainHeight + noiseVal * 0.1) {
            const charPhase = time * 150;
            // Large row/col offsets decouple rows; per-row speed factor makes them cycle independently
            const rowSpeed = 1 + Math.sin(row * 1.3) * 0.4;
            const charVal = Math.sin(col * 2.1 + row * 73.1 + charPhase * rowSpeed)
              * Math.cos(col * 0.9 + row * 61.7 - charPhase * 0.7 * (1 + Math.cos(row * 0.9) * 0.3));
            const weight = Math.max(0, Math.min(0.999, (charVal + 1) / 2));
            const index = Math.floor(weight * densityChars.length);
            char = densityChars[index] ?? "";
            alpha = Math.max(0, 1 - normalizedY * 2);
          }

          if (active && dist < lensEffectRadius) {
            const lensStrength = 1 - dist / lensEffectRadius;
            if (Math.random() > 0.5) {
              // Same row-desync pattern as main field, faster phase for lens reactivity
              const lensRowSpeed = 1 + Math.sin(row * 1.3) * 0.4;
              const lensPhase = time * 300;
              const lensVal = Math.sin(col * 2.1 + row * 73.1 + lensPhase * lensRowSpeed)
                * Math.cos(col * 0.9 + row * 61.7 - lensPhase * 0.7 * (1 + Math.cos(row * 0.9) * 0.3));
              const lensWeight = Math.max(0, Math.min(0.999, (lensVal + 1) / 2));
              char = densityChars[Math.floor(lensWeight * densityChars.length)] ?? "";
              context.fillStyle = `rgba(${asciiBinaryColor}, ${lensStrength})`;
            } else {
              context.fillStyle = `rgba(${asciiColor}, ${alpha})`;
            }

            const safeDist = dist === 0 ? 1 : dist;
            const shiftX = (dx / safeDist) * 10 * lensStrength;
            const shiftY = (dy / safeDist) * 10 * lensStrength;
            context.fillText(char, posX + cell / 2 - shiftX, posY + cell / 2 - shiftY);
          } else if (char) {
            context.fillStyle = `rgba(${asciiColor}, ${alpha})`;
            context.fillText(char, posX + cell / 2, posY + cell / 2);
          }
        }
      }

      timeRef.current += config.animationSpeed;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [config, reducedMotion]);

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
      className="absolute inset-0 cursor-none"
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
      <canvas ref={canvasRef} className="block h-full w-full" data-testid="ascii-canvas" />

      <div
        className="pointer-events-none absolute transition-opacity duration-120 ease-out"
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

      <div className="sr-only">
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default AsciiDisplacementCanvas;
