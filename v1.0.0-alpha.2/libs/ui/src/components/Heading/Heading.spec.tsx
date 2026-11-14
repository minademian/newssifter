import { render, screen } from '@testing-library/react';

import { Heading, SubHeading } from './Heading';

describe('Heading', () => {
  it('renders its label as a level 1 heading', () => {
    render(<Heading label="News Sifter" />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'News Sifter' })
    ).toBeTruthy();
  });

  it('renders SubHeading as a level 4 heading', () => {
    render(<SubHeading label="Sources" />);

    expect(
      screen.getByRole('heading', { level: 4, name: 'Sources' })
    ).toBeTruthy();
  });
});
