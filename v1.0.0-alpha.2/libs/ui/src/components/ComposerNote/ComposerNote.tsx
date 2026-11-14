import { useTranslation } from 'react-i18next';
import { ShieldCheckIcon } from '../ShieldCheckIcon';
import { Note } from './ComposerNote.styles';

export function ComposerNote() {
  const { t } = useTranslation();

  return (
    <Note>
      <ShieldCheckIcon />
      {t('chatbot.composer-note')}
    </Note>
  );
}

export default ComposerNote;
