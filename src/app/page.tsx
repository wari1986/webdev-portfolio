import AsciiDisplacementCanvas from "@/components/canvas/AsciiDisplacementCanvas";
import AgentWidget from "@/components/agent/AgentWidget";
import FooterMeta from "@/components/layout/FooterMeta";
import HeroOverlay from "@/components/hero/HeroOverlay";
import ThemeToggle from "@/components/ui/ThemeToggle";

import agentConfig from "@/config/agent";
import { asciiEngineConfig, siteContent } from "@/lib/content/siteContent";

const HomePage = () => {
  console.log(agentConfig.featureEnabled)
  
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
        {agentConfig.featureEnabled ? <AgentWidget /> : null}
      </div>
    </div>
  );
};

export default HomePage;
