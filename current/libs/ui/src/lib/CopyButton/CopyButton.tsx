import { Check, Copy, X } from 'lucide-react';
import { IconButton } from '../IconButton';
import { CopyState, useClipboard } from '@newssifter/hooks';

export interface CopyButtonProps {
  text: string;
  label?: string;
}

const TITLES: Record<CopyState, string> = {
  idle: 'Copy',
  copied: 'Copied',
  failed: 'Copy failed',
};

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const { state, copy } = useClipboard();
  const Icon = state === 'copied' ? Check : state === 'failed' ? X : Copy;

  return (
    <IconButton
      type="button"
      aria-label={`${label} ${text}`}
      title={TITLES[state]}
      onClick={() => void copy(text)}
    >
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only" role="status">
        {state === 'idle' ? '' : TITLES[state]}
      </span>
    </IconButton>
  );
}

export default CopyButton;
