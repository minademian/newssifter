import { useEffect, useRef } from 'react';

/**
 * Returns a ref for an element that is inert while `inert` is true, so it stays
 * out of the tab order until the caller says it is ready.
 */
export function useInert<T extends HTMLElement>(inert: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (inert) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  }, [inert]);

  return ref;
}
