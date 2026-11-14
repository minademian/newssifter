import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../Accordion';
import { BottomHeroSection } from '../BottomHeroSection';
import { ChatBot } from '../ChatBot';
import { InfoNote } from '../InfoNote';
import { StepsVariant1 } from '../StepsVariant1';
import {
  HeroSection,
  StepsColumn,
  Toggle,
  ToggleButton,
} from './HeroLayout.styles';
import { HeroHeading } from '../HeroHeading';

export type LayoutVariant = 'original' | 'variant-1';

export const LAYOUT_VARIANTS: LayoutVariant[] = ['original', 'variant-1'];

// The steps sit in a collapsed accordion under the chat card; the credit note stays visible below it.
function HeroContent({ steps }: { steps: ReactNode }) {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroHeading />
      <ChatBot />
      <StepsColumn>
        <Accordion title={t('hero.how-it-works')}>{steps}</Accordion>
        <InfoNote />
      </StepsColumn>
    </HeroSection>
  );
}

export function HeroOriginal() {
  return <HeroContent steps={<BottomHeroSection />} />;
}

export function HeroVariant1() {
  return <HeroContent steps={<StepsVariant1 />} />;
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
