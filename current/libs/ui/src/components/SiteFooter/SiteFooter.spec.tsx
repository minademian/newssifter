import { render, screen } from '@testing-library/react';
import '@newssifter/services/i18n.browser.service';

import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('shows the tagline and the copyright line with the company link', () => {
    render(<SiteFooter />);

    expect(screen.getByText('Pause. Check. Think critically.')).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: 'Ursine Enterprises' })
        .getAttribute('href')
    ).toBe('https://ursine.enterprises/');
    expect(document.body.textContent).toContain(
      '© 2026 Newssifter. All rights reserved by Ursine Enterprises.'
    );
  });
});
