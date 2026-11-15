import { useEffect, useRef } from 'react';

/**
 * Returns a ref for an element that grows when `isOpen` turns true. While it grows
 * (for `durationMs`), the page is scrolled down just enough to keep the element's
 * bottom edge in view, so the opening is followed instead of ending off screen.
 *
 * It never scrolls up, never scrolls on first render, and stops scrolling before the
 * element's top edge would leave the viewport.
 */
export function useKeepInViewWhileOpening<T extends HTMLElement>(
  isOpen: boolean,
  durationMs: number,
  margin = 16
) {
  const ref = useRef<T>(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    const justOpened = isOpen && !wasOpen.current;
    wasOpen.current = isOpen;

    const element = ref.current;
    if (!justOpened || !element) {
      return;
    }

    const start = performance.now();
    let frame = 0;

    const follow = (now: number) => {
      const { top, bottom } = element.getBoundingClientRect();
      const hiddenBelow = bottom + margin - window.innerHeight;
      const roomAbove = top - margin;

      if (hiddenBelow > 0 && roomAbove > 0) {
        window.scrollBy({
          top: Math.min(hiddenBelow, roomAbove),
          behavior: 'instant',
        });
      }

      if (now - start < durationMs) {
        frame = requestAnimationFrame(follow);
      }
    };

    frame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, durationMs, margin]);

  return ref;
}
