import { useState } from 'react';
import {
  AppShell,
  HeroLayout,
  LayoutToggle,
  LayoutVariant,
  SiteFooter,
} from '@newssifter/ui';

const STORAGE_KEY = 'newssifter.layout';

const readStoredLayout = (): LayoutVariant => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'variant-1'
      ? 'variant-1'
      : 'original';
  } catch {
    return 'original';
  }
};

export function AppPage() {
  const [layout, setLayout] = useState<LayoutVariant>(readStoredLayout);

  const changeLayout = (variant: LayoutVariant) => {
    setLayout(variant);
    try {
      localStorage.setItem(STORAGE_KEY, variant);
    } catch {
      // Storage can be unavailable (private window); the choice just won't persist.
    }
  };

  return (
    <AppShell
      headerActions={
        import.meta.env.DEV ? (
          <LayoutToggle value={layout} onChange={changeLayout} />
        ) : undefined
      }
      footer={<SiteFooter />}
    >
      <HeroLayout variant={layout} />
    </AppShell>
  );
}

export default AppPage;
