import { Check, FlaskConical, X } from 'lucide-react';
import { generateSampleUrl } from '@newssifter/helpers';
import { CopyState, useClipboard } from '@newssifter/hooks';
import { IconButton } from '../IconButton';

export interface SampleUrlButtonProps {
  source: string;
}

const TITLES: Record<CopyState, string> = {
  idle: 'Generate a sample URL and copy it',
  copied: 'Sample URL copied',
  failed: 'Copy failed',
};

export function SampleUrlButton({ source }: SampleUrlButtonProps) {
  const { state, copy } = useClipboard();
  const Icon =
    state === 'copied' ? Check : state === 'failed' ? X : FlaskConical;

  return (
    <IconButton
      type="button"
      aria-label={`Generate a sample URL for ${source} and copy it`}
      title={TITLES[state]}
      onClick={() => void copy(generateSampleUrl(source))}
    >
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only" role="status">
        {state === 'idle' ? '' : TITLES[state]}
      </span>
    </IconButton>
  );
}

export default SampleUrlButton;
