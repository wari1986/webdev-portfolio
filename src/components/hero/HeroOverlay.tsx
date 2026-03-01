"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  subtitle: string;
};

const SCRAMBLE_CHARS = " .'`^,:;Il!i><~+_-?][}{1)(|/AHJGXnyerz*#MW&8%B@$";
const SCRAMBLE_DURATION_MS = 1250;

const HeroOverlay = ({ title, subtitle }: Props) => {
  const [displayTitle, setDisplayTitle] = useState(title);
  const [scrambleActive, setScrambleActive] = useState(false);
  const [revealCount, setRevealCount] = useState(title.length);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const runScramble = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    startRef.current = null;
    setScrambleActive(true);
    setRevealCount(0);
    setDisplayTitle(title);

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(1, elapsed / SCRAMBLE_DURATION_MS);
      const nextRevealCount = Math.floor(progress * title.length);

      const next = title
        .split("")
        .map((char, index) => {
          const isWordChar = /[A-Za-z0-9]/.test(char);
          if (!isWordChar) return char;
          if (index < nextRevealCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? char;
        })
        .join("");

      setDisplayTitle(next);
      setRevealCount(nextRevealCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayTitle(title);
        setRevealCount(title.length);
        setScrambleActive(false);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <section
      className="pointer-events-none absolute z-2 left-[clamp(22px,4vw,42px)] right-[clamp(22px,4vw,42px)] bottom-[clamp(64px,9vw,108px)] animate-[rise-in_500ms_ease-out] max-[960px]:bottom-[42px]"
      aria-label="Project headline"
    >
      <h1
        className="pointer-events-auto m-0 max-w-[650px] text-[var(--color-fg)] text-[clamp(2rem,5.3vw,4.1rem)] leading-[1.06] tracking-[-0.03em] font-semibold"
        onPointerEnter={runScramble}
      >
        {scrambleActive
          ? displayTitle.split("").map((char, index) => {
              const isWordChar = /[A-Za-z0-9]/.test(title[index] ?? "");
              const isScramblingChar = isWordChar && index >= revealCount;
              return (
                <span
                  key={`${index}-${char}-${revealCount}`}
                  className={isScramblingChar ? "text-neutral-600" : "text-[var(--color-fg)]"}
                >
                  {char}
                </span>
              );
            })
          : title}
      </h1>
      <p className="mt-3 mb-0 max-w-[520px] text-[var(--color-fg-soft)] font-mono text-[clamp(0.85rem,1.3vw,1rem)]">
        {subtitle}
      </p>
    </section>
  );
};

export default HeroOverlay;
