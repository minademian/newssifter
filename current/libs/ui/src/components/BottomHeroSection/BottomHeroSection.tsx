import { useTranslation } from 'react-i18next';
import { InfoNote } from '../InfoNote';
import { Step, StepNumber, StepsList } from './BottomHeroSection.styles';

const STEP_KEYS = ['enter', 'check', 'data', 'context'] as const;

export function BottomHeroSection() {
  const { t } = useTranslation();

  return (
    <div className="hero-copy-details">
      <StepsList>
        {STEP_KEYS.map((key, index) => (
          <Step key={key}>
            <StepNumber aria-hidden="true">{index + 1}</StepNumber>
            <span>{t(`steps.${key}.text`)}</span>
          </Step>
        ))}
      </StepsList>
      <InfoNote />
    </div>
  );
}
