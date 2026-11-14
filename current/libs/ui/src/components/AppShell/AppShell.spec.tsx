import { render, screen } from '@testing-library/react';
import '@newssifter/services/i18n.browser.service';

import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('wraps the page content with the site header and the given parts', () => {
    render(
      <AppShell
        headerActions={<button type="button">Header action</button>}
        footer={<p>Footer content</p>}
      >
        <p>Page content</p>
      </AppShell>
    );

    expect(screen.getByRole('link', { name: 'News Sifter home' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Header action' })).toBeTruthy();
    expect(screen.getByText('Page content')).toBeTruthy();
    expect(screen.getByText('Footer content')).toBeTruthy();
  });

  it('has no footer unless one is given', () => {
    render(
      <AppShell>
        <p>Only content</p>
      </AppShell>
    );

    expect(screen.getByText('Only content')).toBeTruthy();
    expect(screen.queryByRole('contentinfo')).toBeNull();
  });
});
