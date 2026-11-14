import { useState } from 'react';

/**
 * True when the visitor has asked the browser to reduce motion.
 * The value is read once, on the first render.
 */
export function usePrefersReducedMotion() {
  const [reduceMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return reduceMotion;
}
