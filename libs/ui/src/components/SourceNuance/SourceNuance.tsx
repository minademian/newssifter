import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Body, Nuance, Title } from './SourceNuance.styles';

export interface SourceNuanceProps {
  title?: string;
  children?: ReactNode;
}

export function SourceNuance({ title, children }: SourceNuanceProps) {
  const { t } = useTranslation();
  const heading = title ?? t('source-nuance.title');

  return (
    <Nuance aria-label={heading}>
      <Title>{heading}</Title>
      <Body>{children ?? t('source-nuance.placeholder')}</Body>
    </Nuance>
  );
}

export default SourceNuance;
