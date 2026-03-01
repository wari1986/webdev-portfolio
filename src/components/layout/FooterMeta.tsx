"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FooterMetaProps } from "@/types/site";

const getGmtPlusOneClock = () => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const gmtPlusOne = new Date(utcMs + 60 * 60_000);
  const hh = String(gmtPlusOne.getHours()).padStart(2, "0");
  const mm = String(gmtPlusOne.getMinutes()).padStart(2, "0");
  const ss = String(gmtPlusOne.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

const FooterMeta = ({
  authorMeta,
  authorDescription,
  socialLinks,
  year,
  indexLabel,
  statusLine,
}: FooterMetaProps) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState(() => getGmtPlusOneClock());

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: Math.round(event.clientX), y: Math.round(event.clientY) });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(getGmtPlusOneClock());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-[rgba(17,17,17,0.14)] px-6 pt-5 pb-4 flex-1 flex flex-col justify-between max-[960px]:px-3.5 max-[960px]:pt-3.5 max-[960px]:pb-3" data-testid="footer-meta">
      <div className="grid grid-cols-[1.3fr_0.8fr] gap-5 max-[960px]:grid-cols-1 max-[960px]:gap-3.5">
        <div className="max-[960px]:order-1">
          <p className="m-0 font-mono text-[0.75rem] uppercase tracking-[0.02em] text-[var(--color-fg-muted)] max-[960px]:hidden">{`${authorMeta} ${clock} GMT+1`}</p>
          <p className="mt-1.5 mb-0 max-w-[460px] text-[0.9rem] leading-[1.4] text-[var(--color-fg)]">{authorDescription}</p>
          <p className="mt-2 m-0 text-[0.82rem] text-[var(--color-fg-muted)] min-[961px]:hidden">{statusLine}</p>
        </div>
        <nav className="flex flex-col gap-1 max-[960px]:order-3" aria-label="Social links">
          {socialLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="inline-flex min-h-7 w-fit items-center text-[0.9rem] text-[#1b1b1b] no-underline hover:underline outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-end justify-between max-[960px]:hidden">
        <div>
          <p className="m-0 text-[0.82rem] text-[var(--color-fg-muted)]">{statusLine}</p>
        </div>
        <p className="m-0 font-mono text-[0.75rem] text-[var(--color-fg-muted)]">{`X: ${mouse.x}  Y: ${mouse.y}`}</p>
      </div>
    </footer>
  );
};

export default FooterMeta;
