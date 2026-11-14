import 'the-new-css-reset/css/reset.css';
import '../styles.scss';

import { useState } from 'react';
import { HeroLayout, LayoutToggle, LayoutVariant } from '@newssifter/ui';

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

export function App() {
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
    <main className="app-shell">
      <div className="app-container">
        <header className="site-header">
          <a className="brand" href="/" aria-label="News Sifter home">
            <img className="brand-banner" src="/banner.jpeg" alt="" />
          </a>
          <LayoutToggle value={layout} onChange={changeLayout} />
        </header>

        <HeroLayout variant={layout} />

        <footer className="site-footer">
          <span>Pause. Check. Think critically.</span>
          <span>&copy; 2026 Newssifter. All rights reserved by <a href="https://ursine.enterprises/">Ursine Enterprises</a>.</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
