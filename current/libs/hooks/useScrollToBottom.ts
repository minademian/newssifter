import { useEffect, useRef } from 'react';

/**
 * Returns a ref for a scrollable element. Whenever any of `triggers` changes,
 * the element is smoothly scrolled to its bottom.
 */
export function useScrollToBottom<T extends HTMLElement>(
  triggers: readonly unknown[]
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }
    // The caller decides what should re-run the scroll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, triggers);

  return ref;
}
