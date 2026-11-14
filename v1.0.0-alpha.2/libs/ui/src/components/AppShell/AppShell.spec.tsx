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

  it('puts the banner in the middle column and the actions in the last one', () => {
    render(
      <AppShell headerActions={<button type="button">Header action</button>}>
        <p>Page content</p>
      </AppShell>
    );

    const brand = screen.getByRole('link', { name: 'News Sifter home' });
    const header = brand.parentElement as HTMLElement;
    const actions = screen.getByRole('button', { name: 'Header action' })
      .parentElement as HTMLElement;

    // equal outer columns keep the banner centred whatever the actions' width
    expect(getComputedStyle(header).display).toBe('grid');
    expect(getComputedStyle(header).gridTemplateColumns).toBe('1fr auto 1fr');
    expect(getComputedStyle(brand).gridColumn).toBe('2');
    expect(getComputedStyle(actions).gridColumn).toBe('3');
    expect(getComputedStyle(actions).justifySelf).toBe('end');
  });

  it('keeps the banner centred when there are no actions', () => {
    render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );

    const brand = screen.getByRole('link', { name: 'News Sifter home' });
    expect(getComputedStyle(brand).gridColumn).toBe('2');
    expect(brand.nextElementSibling).not.toBeNull();
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
