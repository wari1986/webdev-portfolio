"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { FooterMetaProps } from "@/types/site";

const getBrusselsClock = (): string => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Brussels",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const getBrusselsOffsetLabel = (): string => {
  try {
    const now = new Date();
    const utcMs = new Date(now.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
    const brusselsMs = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Brussels" })).getTime();
    const offset = Math.round((brusselsMs - utcMs) / 3_600_000);
    return offset >= 0 ? `GMT+${offset}` : `GMT${offset}`;
  } catch {
    return "GMT+1";
  }
};

const getSocialIcon = (id: string) => {
  switch (id) {
    case "email": return Mail;
    case "github": return Github;
    case "linkedin": return Linkedin;
    default: return null;
  }
};

const FooterMeta = ({
  authorMeta,
  authorDescription,
  socialLinks,
  year,
  statusLine,
}: FooterMetaProps) => {
  const [clock, setClock] = useState("");
  const [offsetLabel, setOffsetLabel] = useState("GMT+1");

  useEffect(() => {
    setOffsetLabel(getBrusselsOffsetLabel());
    setClock(getBrusselsClock());

    const timer = window.setInterval(() => {
      setClock(getBrusselsClock());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer
      className="border-t border-[var(--color-divider)] px-6 pt-5 pb-4 flex flex-col gap-4 max-[960px]:px-4 max-[960px]:pt-4 max-[960px]:pb-4 max-[960px]:gap-3"
      data-testid="footer-meta"
    >
      <div className="grid grid-cols-[1.3fr_0.8fr] gap-5 max-[960px]:grid-cols-1 max-[960px]:gap-3">
        <div>
          <p
            suppressHydrationWarning
            className="m-0 font-mono text-[0.73rem] uppercase tracking-[0.06em] text-[var(--color-fg-muted)]"
          >
            {`${authorMeta} · ${clock} ${offsetLabel}`}
          </p>
          <p className="mt-1.5 mb-0 max-w-[460px] text-[0.9rem] leading-[1.45] text-[var(--color-fg)] max-[960px]:text-[0.88rem]">
            {authorDescription}
          </p>
        </div>

        <nav className="flex flex-col gap-0.5 max-[960px]:flex-row max-[960px]:flex-wrap max-[960px]:gap-x-5 max-[960px]:gap-y-1" aria-label="Social links">
          {socialLinks.map((item) => {
            const Icon = getSocialIcon(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="inline-flex min-h-7 w-fit items-center gap-2 text-[0.88rem] text-[var(--color-link)] no-underline hover:underline outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus-outline)] focus-visible:outline-offset-2"
              >
                {Icon && <Icon size={13} className="opacity-60 shrink-0" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center justify-between">
        <p className="m-0 text-[0.78rem] text-[var(--color-fg-muted)] leading-[1.4] max-w-[600px]">
          {statusLine}
        </p>
        <p
          suppressHydrationWarning
          className="m-0 font-mono text-[0.72rem] text-[var(--color-fg-muted)] shrink-0 pl-4"
        >
          {year}
        </p>
      </div>
    </footer>
  );
};

export default FooterMeta;
