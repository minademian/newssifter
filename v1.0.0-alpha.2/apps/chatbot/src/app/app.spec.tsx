import { render, screen } from '@testing-library/react';
import '@newssifter/services/i18n.browser.service';

import AppPage from './App';

describe('AppPage', () => {
  beforeAll(() => {
    // jsdom does not implement scrollTo, which the chat card calls on render.
    HTMLElement.prototype.scrollTo =
      vi.fn() as unknown as HTMLElement['scrollTo'];
  });

  it('renders the hero inside the app shell, with the layout toggle', () => {
    render(<AppPage />);

    expect(screen.getByRole('link', { name: 'News Sifter home' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Original' })).toBeTruthy();
    expect(screen.getByText('less partisan factchecking.')).toBeTruthy();
    expect(screen.getByText('Pause. Check. Think critically.')).toBeTruthy();
  });
});
