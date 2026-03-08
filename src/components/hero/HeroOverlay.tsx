"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  statusLine: string;
  ctaLabel: string;
  ctaHref: string;
};

const SCRAMBLE_CHARS = " .'`^,:;Il!i><~+_-?][}{1)(|/AHJGXnyerz*#MW&8%B@$";
const SCRAMBLE_DURATION_MS = 1250;

const HeroOverlay = ({ title, subtitle, statusLine, ctaLabel, ctaHref }: Props) => {
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
      className="pointer-events-none absolute z-2 left-[clamp(22px,4vw,42px)] right-[clamp(22px,4vw,42px)] bottom-[clamp(48px,7vw,88px)] animate-[rise-in_500ms_ease-out] max-[960px]:bottom-[32px]"
      aria-label="Project headline"
    >
      <h1
        className="pointer-events-auto m-0 w-fit text-[var(--color-fg)] text-[clamp(2rem,5.3vw,4.1rem)] leading-[1.06] tracking-[-0.03em] font-semibold"
        onPointerEnter={runScramble}
      >
        {scrambleActive
          ? displayTitle.split("").map((char, index) => {
              const isWordChar = /[A-Za-z0-9]/.test(title[index] ?? "");
              const isScramblingChar = isWordChar && index >= revealCount;
              return (
                <span
                  key={`${index}-${char}-${revealCount}`}
                  className={isScramblingChar ? "text-[var(--color-scramble)]" : "text-[var(--color-fg)]"}
                >
                  {char}
                </span>
              );
            })
          : title}
      </h1>

      <p className="mt-2 mb-0 text-[var(--color-fg-soft)] font-mono text-[clamp(0.78rem,1.3vw,1rem)] whitespace-nowrap max-[640px]:whitespace-normal">
        {subtitle}
      </p>

      <div className="flex items-start gap-2 mt-3 max-[960px]:mt-2.5">
        <span
          className="mt-[0.38em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-available)]"
          aria-hidden="true"
        />
        <p className="m-0 text-[clamp(0.73rem,1.05vw,0.83rem)] text-[var(--color-fg-muted)] leading-[1.5] max-[960px]:text-[0.78rem] whitespace-nowrap max-[640px]:whitespace-normal">
          {statusLine}
        </p>
      </div>

      <a
        href={ctaHref}
        className="pointer-events-auto inline-flex items-center mt-5 px-4 py-2 text-[0.88rem] border border-[var(--color-border)] text-[var(--color-fg)] no-underline hover:bg-[var(--color-panel-soft)] transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus-outline)] focus-visible:outline-offset-2 max-[960px]:mt-4 max-[960px]:text-[0.85rem] max-[960px]:px-3.5 max-[960px]:py-1.5"
      >
        {ctaLabel}
      </a>
    </section>
  );
};

export default HeroOverlay;
