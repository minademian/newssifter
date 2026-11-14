const SLUGS = [
  'breaking-story-you-wont-believe',
  'what-the-experts-are-saying',
  'opinion-the-week-in-review',
  'local-officials-respond-to-report',
  'ten-things-to-know-today',
  'investigation-raises-new-questions',
];

const pick = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

/**
 * Builds a believable article URL on a source's domain, for trying the lookup
 * with a full link instead of a bare domain.
 */
export function generateSampleUrl(source: string): string {
  const base = source
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');
  const year = 2020 + Math.floor(Math.random() * 6);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');

  return `https://${base}/${year}/${month}/${pick(SLUGS)}`;
}
