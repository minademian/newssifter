import { useTranslation } from 'react-i18next';
import { InfoNote } from '../InfoNote';
import {
  Details,
  Step,
  StepNumber,
  StepsList,
} from './BottomHeroSection.styles';

const STEP_KEYS = ['enter', 'check', 'data', 'context'] as const;

export function BottomHeroSection() {
  const { t } = useTranslation();

  return (
    <Details>
      <StepsList>
        {STEP_KEYS.map((key, index) => (
          <Step key={key}>
            <StepNumber aria-hidden="true">{index + 1}</StepNumber>
            <span>{t(`steps.${key}.text`)}</span>
          </Step>
        ))}
      </StepsList>
      <InfoNote />
    </Details>
  );
}
