import { useTranslation } from 'react-i18next';
import { BottomHeroSection } from '../BottomHeroSection';
import { ChatBot } from '../ChatBot';
import { StepsVariant1 } from '../StepsVariant1';
import {
  HeadingWrap,
  HeroSection,
  Toggle,
  ToggleButton,
} from './HeroLayout.styles';

export type LayoutVariant = 'original' | 'variant-1';

export const LAYOUT_VARIANTS: LayoutVariant[] = ['original', 'variant-1'];

function HeroHeading() {
  const { t } = useTranslation();

  return (
    <HeadingWrap>
      <h1>
        {t('hero.heading-line1')}
        <br />
        <em>{t('hero.heading-line2')}</em>
      </h1>
    </HeadingWrap>
  );
}

export function HeroOriginal() {
  return (
    <HeroSection>
      <HeroHeading />
      <ChatBot />
      <BottomHeroSection />
    </HeroSection>
  );
}

export function HeroVariant1() {
  return (
    <HeroSection>
      <HeroHeading />
      <ChatBot />
      <StepsVariant1 />
    </HeroSection>
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
  const { t } = useTranslation();

  return (
    <Toggle role="group" aria-label={t('layout.label')}>
      {LAYOUT_VARIANTS.map((variant) => (
        <ToggleButton
          key={variant}
          type="button"
          aria-pressed={value === variant}
          onClick={() => onChange(variant)}
        >
          {t(`layout.${variant}`)}
        </ToggleButton>
      ))}
    </Toggle>
  );
}
