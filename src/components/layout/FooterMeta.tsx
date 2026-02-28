import Link from "next/link";

import { FooterMetaProps } from "@/types/site";

const FooterMeta = ({
  authorMeta,
  authorDescription,
  socialLinks,
  year,
  indexLabel,
  statusLine,
  debugLabel,
}: FooterMetaProps) => {
  return (
    <footer className="footer-meta" data-testid="footer-meta">
      <div className="footer-meta__grid">
        <div className="footer-meta__column">
          <p className="footer-meta__kicker">{authorMeta}</p>
          <p className="footer-meta__description">{authorDescription}</p>
        </div>
        <nav className="footer-meta__column footer-meta__links" aria-label="Social links">
          {socialLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="footer-meta__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-meta__column footer-meta__year">{year}</div>
      </div>

      <div className="footer-meta__bottom">
        <p className="footer-meta__index">{indexLabel}</p>
        <p className="footer-meta__status">{statusLine}</p>
        <p className="footer-meta__debug">{debugLabel}</p>
      </div>
    </footer>
  );
};

export default FooterMeta;
