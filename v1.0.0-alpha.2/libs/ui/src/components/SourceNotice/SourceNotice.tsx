import { useTranslation } from 'react-i18next';
import { Body, Notice, Title } from './SourceNotice.styles';

export type SourceNoticeType = 'fake' | 'hate';

export interface SourceNoticeProps {
  type: SourceNoticeType;
}

export function SourceNotice({ type }: SourceNoticeProps) {
  const { t } = useTranslation();
  const title = t(`source-notice.${type}.title`);
  const body = t(`source-notice.${type}.body`);

  return (
    <Notice role="alert" aria-label={title}>
      <Title>{title}</Title>
      <Body>{body}</Body>
    </Notice>
  );
}

export default SourceNotice;
