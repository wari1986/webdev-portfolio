import AsciiDisplacementCanvas from "@/components/canvas/AsciiDisplacementCanvas";
import AgentWidget from "@/components/agent/AgentWidget";
import FooterMeta from "@/components/layout/FooterMeta";
import HeroOverlay from "@/components/hero/HeroOverlay";
import ThemeToggle from "@/components/ui/ThemeToggle";

import agentConfig from "@/config/agent";
import { asciiEngineConfig, siteContent } from "@/lib/content/siteContent";

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
            className="relative flex-1"
            aria-label="Interactive visual field"
          >
            <AsciiDisplacementCanvas config={asciiEngineConfig} title={siteContent.title} subtitle={siteContent.subtitle} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
              style={{ background: "linear-gradient(to top, var(--color-panel) 0%, var(--color-panel) 12%, transparent 62%)" }}
            />
            <HeroOverlay
              title={siteContent.title}
              subtitle={siteContent.subtitle}
              statusLine={siteContent.statusLine}
              ctaLabel={siteContent.ctaLabel}
              ctaHref={siteContent.ctaHref}
            />
          </section>

          <FooterMeta
            authorMeta={siteContent.authorMeta}
            authorDescription={siteContent.authorDescription}
            socialLinks={siteContent.socialLinks}
            year={siteContent.year}
            statusLine={siteContent.statusLine}
          />
        </main>
        {agentConfig.featureEnabled ? <AgentWidget /> : null}
      </div>
    </div>
  );
};

export default HomePage;
