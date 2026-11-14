import 'the-new-css-reset/css/reset.css';
import '../styles.scss';

import { ChatBot, BottomHeroSection } from '@newssifter/ui';

export function App() {
  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="site-header">
          <a className="brand" href="/" aria-label="News Sifter home">
            <img className="brand-banner" src="/banner.jpeg" alt="" />
          </a>
        </header>

        <section className="hero-layout">
          <div className="hero-copy-heading">
            <h1>
              More fair,
              <br />
              <em>less partisan factchecking.</em>
            </h1>
          </div>
          <ChatBot />
          <BottomHeroSection />
        </section>

        <footer className="site-footer">
          <span>Pause. Check. Think critically.</span>
          <span>News Sifter · Source lookup</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
