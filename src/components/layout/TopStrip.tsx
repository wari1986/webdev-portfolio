import { Bookmark, ChevronLeft, Heart } from "lucide-react";

import { TopStripProps } from "@/types/site";

const iconMap = {
  bookmark: Bookmark,
  heart: Heart,
} as const;

const TopStrip = ({ brand, routeLabel, utilityCounters }: TopStripProps) => {
  return (
    <header className="top-strip" data-testid="top-strip">
      <div className="top-strip__left">
        <button className="top-strip__back" type="button" aria-label="Back to previous page">
          <ChevronLeft size={16} strokeWidth={1.8} />
        </button>
        <p className="top-strip__crumb">{brand}</p>
        <span className="top-strip__sep">/</span>
        <p className="top-strip__crumb">{routeLabel}</p>
      </div>
      <nav className="top-strip__right" aria-label="Utility counters">
        {utilityCounters.map((counter) => {
          const Icon = iconMap[counter.icon];
          return (
            <span className="top-strip__counter" key={counter.id}>
              <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>{counter.value}</span>
            </span>
          );
        })}
      </nav>
    </header>
  );
};

export default TopStrip;
