import { ChatBot } from './ChatBot';
import { BottomHeroSection } from './BottomHeroSection';
import { StepsVariant1 } from './StepsVariant1';

export type LayoutVariant = 'original' | 'variant-1';

export const LAYOUT_VARIANTS: { id: LayoutVariant; label: string }[] = [
  { id: 'original', label: 'Original' },
  { id: 'variant-1', label: 'Variant 1' },
];

function HeroHeading() {
  return (
    <div className="hero-copy-heading">
      <h1>
        More fair,
        <br />
        <em>less partisan factchecking.</em>
      </h1>
    </div>
  );
}

export function HeroOriginal() {
  return (
    <section className="hero-layout">
      <HeroHeading />
      <ChatBot />
      <BottomHeroSection />
    </section>
  );
}

export function HeroVariant1() {
  return (
    <section className="hero-layout">
      <HeroHeading />
      <ChatBot />
      <StepsVariant1 />
    </section>
  );
}

export function HeroLayout({ variant }: { variant: LayoutVariant }) {
  return variant === 'variant-1' ? <HeroVariant1 /> : <HeroOriginal />;
}

export function LayoutToggle({
  value,
  onChange,
}: {
  value: LayoutVariant;
  onChange: (variant: LayoutVariant) => void;
}) {
  return (
    <div className="layout-toggle" role="group" aria-label="Page layout">
      {LAYOUT_VARIANTS.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className="layout-toggle-button"
          aria-pressed={value === variant.id}
          onClick={() => onChange(variant.id)}
        >
          {variant.label}
        </button>
      ))}
    </div>
  );
}
