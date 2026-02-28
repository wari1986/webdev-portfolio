type Props = {
  title: string;
  subtitle: string;
};

const HeroOverlay = ({ title, subtitle }: Props) => {
  return (
    <section className="hero-overlay" aria-label="Project headline">
      <h1 className="hero-overlay__title">{title}</h1>
      <p className="hero-overlay__subtitle">{subtitle}</p>
    </section>
  );
};

export default HeroOverlay;
