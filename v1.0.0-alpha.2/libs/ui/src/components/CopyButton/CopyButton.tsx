import { useTranslation } from 'react-i18next';
import { Check, Copy, X } from 'lucide-react';
import { CopyState, useClipboard } from '@newssifter/hooks';
import { IconButton } from '../IconButton';
import { VisuallyHidden } from '../VisuallyHidden';

export interface CopyButtonProps {
  text: string;
}

const TITLE_KEYS: Record<CopyState, string> = {
  idle: 'copy-button.copy',
  copied: 'copy-button.copied',
  failed: 'copy-button.failed',
};

export function CopyButton({ text }: CopyButtonProps) {
  const { t } = useTranslation();
  const { state, copy } = useClipboard();
  const Icon = state === 'copied' ? Check : state === 'failed' ? X : Copy;

  return (
    <IconButton
      type="button"
      aria-label={t('copy-button.aria-label', { text })}
      title={t(TITLE_KEYS[state])}
      onClick={() => void copy(text)}
    >
      <Icon size={14} aria-hidden="true" />
      <VisuallyHidden role="status">
        {state === 'idle' ? '' : t(TITLE_KEYS[state])}
      </VisuallyHidden>
    </IconButton>
  );
}

export default CopyButton;
