import AsciiDisplacementCanvas from "@/components/canvas/AsciiDisplacementCanvas";
import FooterMeta from "@/components/layout/FooterMeta";
import HeroOverlay from "@/components/hero/HeroOverlay";
import { asciiEngineConfig, siteContent } from "@/lib/content/siteContent";

const HomePage = () => {
  return (
    <div className="page-shell">
      <div className="workspace">
        <main id="main" className="panel" data-testid="main-panel">
          <section className="panel__header" aria-label="Monogram initials">
            <span className="panel__mono">{siteContent.monogramLeft}</span>
            <span className="panel__mono">{siteContent.monogramRight}</span>
          </section>

          <section className="panel__canvas-zone" aria-label="Interactive visual field">
            <AsciiDisplacementCanvas config={asciiEngineConfig} title={siteContent.title} subtitle={siteContent.subtitle} />
            <HeroOverlay title={siteContent.title} subtitle={siteContent.subtitle} />
          </section>

          <FooterMeta
            authorMeta={siteContent.authorMeta}
            authorDescription={siteContent.authorDescription}
            socialLinks={siteContent.socialLinks}
            year={siteContent.year}
            indexLabel={siteContent.indexLabel}
            statusLine={siteContent.statusLine}
            debugLabel={siteContent.debugLabel}
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
