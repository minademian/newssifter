import { useTranslation } from 'react-i18next';
import { Check, FlaskConical, X } from 'lucide-react';
import { generateSampleUrl } from '@newssifter/helpers';
import { CopyState, useClipboard } from '@newssifter/hooks';
import { IconButton } from '../IconButton';

export interface SampleUrlButtonProps {
  source: string;
}

const TITLE_KEYS: Record<CopyState, string> = {
  idle: 'sample-url-button.generate',
  copied: 'sample-url-button.copied',
  failed: 'sample-url-button.failed',
};

export function SampleUrlButton({ source }: SampleUrlButtonProps) {
  const { t } = useTranslation();
  const { state, copy } = useClipboard();
  const Icon =
    state === 'copied' ? Check : state === 'failed' ? X : FlaskConical;

  return (
    <IconButton
      type="button"
      aria-label={t('sample-url-button.aria-label', { source })}
      title={t(TITLE_KEYS[state])}
      onClick={() => void copy(generateSampleUrl(source))}
    >
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only" role="status">
        {state === 'idle' ? '' : t(TITLE_KEYS[state])}
      </span>
    </IconButton>
  );
}

export default SampleUrlButton;
