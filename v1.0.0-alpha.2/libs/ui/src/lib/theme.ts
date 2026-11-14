// Design tokens for styled components. Values point at the CSS variables defined
// in apps/chatbot/src/styles.scss (:root), so the palette still has a single source
// until the chatbot styles are migrated.
export const theme = {
  colors: {
    ink: 'var(--ink)',
    inkSoft: 'var(--ink-soft)',
    muted: 'var(--muted)',
    mutedLight: 'var(--muted-light)',
    blue: 'var(--blue)',
    blueMid: 'var(--blue-mid)',
    blueLight: 'var(--blue-light)',
    bluePale: 'var(--blue-pale)',
    orange: 'var(--orange)',
    line: 'var(--line)',
    surface: 'var(--surface)',
  },
} as const;

export type Theme = typeof theme;
