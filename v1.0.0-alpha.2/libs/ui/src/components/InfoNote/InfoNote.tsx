import { useTranslation } from 'react-i18next';
import { Icon, Lead, Note, SourceLink, Text } from './InfoNote.styles';

export function InfoNote() {
  const { t } = useTranslation();

  return (
    <Note>
      <Icon aria-hidden="true">i</Icon>
      <Text>
        <Lead>{t('info-note.inspired-by')}</Lead>
        <em>
          <SourceLink href="https://docs.google.com/document/d/10eA5-mCZLSS4MQY5QGb5ewC3VAL6pLkT53V_81ZyitM/preview?tab=t.0">
            {t('info-note.link')}
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M9 2.5h4.5V7M13.2 2.8 7.5 8.5M11.5 8.5v4H3.5v-8h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SourceLink>
        </em>
      </Text>
    </Note>
  );
}

export default InfoNote;
