import { useEffect, useState } from 'react';

const startedAt = new Map<string, number>();

const hasFinished = (id: string, delayMs: number) => {
  const started = startedAt.get(id);
  return started !== undefined && Date.now() - started >= delayMs;
};

/**
 * Gates a one-time intro for this document load. `opened` becomes true after
 * `delayMs`. It stays true on a later visit that does not reload the page, and
 * a Strict Mode remount does not restart the delay. `settle` marks `ready`
 * once the caller has finished following up, for example after an animation.
 */
export function useOncePerLoad(id: string, delayMs: number) {
  const [opened, setOpened] = useState(() => hasFinished(id, delayMs));
  const [ready, setReady] = useState(() => hasFinished(id, delayMs));

  useEffect(() => {
    if (hasFinished(id, delayMs)) return;

    const started = startedAt.get(id) ?? Date.now();
    if (!startedAt.has(id)) startedAt.set(id, started);

    const remaining = Math.max(0, delayMs - (Date.now() - started));
    const timeout = window.setTimeout(() => {
      setOpened(true);
      if (remaining === 0) setReady(true);
    }, remaining);
    return () => window.clearTimeout(timeout);
  }, [id, delayMs]);

  const settle = () => {
    if (opened) setReady(true);
  };

  return { opened, ready, settle };
}
