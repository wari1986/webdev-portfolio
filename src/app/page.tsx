import AsciiDisplacementCanvas from "@/components/canvas/AsciiDisplacementCanvas";
import FooterMeta from "@/components/layout/FooterMeta";
import HeroOverlay from "@/components/hero/HeroOverlay";

import { asciiEngineConfig, siteContent } from "@/lib/content/siteContent";

const HomePage = () => {
  return (
    <div className="h-screen bg-[var(--color-bg)]">
      <div className="relative flex">
        <main
          id="main"
          className="h-screen w-screen overflow-hidden border border-white/15 bg-[var(--color-panel)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col"
          data-testid="main-panel"
        >
          <section
            className="relative h-[min(66dvh,640px)] max-[960px]:h-[min(56dvh,480px)]"
            aria-label="Interactive visual field"
          >
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
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
