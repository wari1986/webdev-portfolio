import AsciiDisplacementCanvas from "@/components/canvas/AsciiDisplacementCanvas";
import FooterMeta from "@/components/layout/FooterMeta";
import HeroOverlay from "@/components/hero/HeroOverlay";
import ThemeToggle from "@/components/ui/ThemeToggle";

import { asciiEngineConfig, siteContent } from "@/lib/content/siteContent";

const ctaHref = siteContent.socialLinks.find((l) => l.id === "email")?.href ?? "#";

const HomePage = () => {
  return (
    <div className="h-screen bg-[var(--color-bg)]">
      <div className="relative flex">
        <main
          id="main"
          className="relative h-screen w-screen overflow-hidden border border-[var(--color-panel-border)] bg-[var(--color-panel)] shadow-[inset_0_0_0_1px_var(--color-panel-inner-border)] flex flex-col"
          data-testid="main-panel"
        >
          <div className="absolute right-4 top-4 z-10 max-[960px]:right-3 max-[960px]:top-3">
            <ThemeToggle />
          </div>

          <section
            className="relative h-[min(66dvh,640px)] max-[960px]:h-[min(56dvh,480px)]"
            aria-label="Interactive visual field"
          >
            <AsciiDisplacementCanvas config={asciiEngineConfig} title={siteContent.title} subtitle={siteContent.subtitle} />
            {/* Vignette: fades canvas into the panel background so hero text reads cleanly */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[45%] z-[1] pointer-events-none"
              style={{ background: "linear-gradient(to top, var(--color-panel), transparent)" }}
            />
            <HeroOverlay
              title={siteContent.title}
              subtitle={siteContent.subtitle}
              statusLine={siteContent.statusLine}
              ctaHref={ctaHref}
            />
          </section>

          <FooterMeta
            authorMeta={siteContent.authorMeta}
            authorDescription={siteContent.authorDescription}
            socialLinks={siteContent.socialLinks}
            year={siteContent.year}
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
