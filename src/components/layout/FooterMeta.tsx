"use client";

import Link from "next/link";

import { FooterMetaProps } from "@/types/site";

const FooterMeta = ({
  authorMeta,
  authorDescription,
  socialLinks,
  year,
}: FooterMetaProps) => {
  return (
    <footer className="border-t border-[var(--color-divider)] px-6 pt-5 pb-4 flex-1 flex flex-col justify-between max-[960px]:px-3.5 max-[960px]:pt-3.5 max-[960px]:pb-3" data-testid="footer-meta">
      <div className="grid grid-cols-[1.3fr_0.8fr] gap-5 max-[960px]:grid-cols-1 max-[960px]:gap-3.5">
        <div className="max-[960px]:order-1">
          <p className="m-0 font-mono text-[0.75rem] uppercase tracking-[0.02em] text-[var(--color-fg-muted)]">{`${authorMeta} · Ghent, Belgium — GMT+1`}</p>
          <p className="mt-1.5 mb-0 max-w-[460px] text-[0.9rem] leading-[1.4] text-[var(--color-fg)]">{authorDescription}</p>
        </div>
        <nav className="flex flex-col gap-1 max-[960px]:order-3" aria-label="Social links">
          {socialLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="inline-flex min-h-7 w-fit items-center text-[0.9rem] text-[var(--color-link)] no-underline hover:underline outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus-outline)] focus-visible:outline-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="m-0 font-mono text-[0.72rem] text-[var(--color-fg-muted)]">{year}</p>
    </footer>
  );
};

export default FooterMeta;
