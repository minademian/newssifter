import { render, screen } from '@testing-library/react';

import { Logo } from './Logo';

describe('Logo', () => {
  it('shows the full logo image with the given alt text', () => {
    render(<Logo alt="News Sifter" />);

    const image = screen.getByRole('img', { name: 'News Sifter' });
    expect(image.getAttribute('src')).toBe('/logo-full.jpeg');
  });
});
