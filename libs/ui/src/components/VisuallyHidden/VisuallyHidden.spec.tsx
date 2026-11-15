import { render, screen } from '@testing-library/react';

import { VisuallyHidden, VisuallyHiddenLabel } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('keeps text in the page for screen readers while taking it out of the layout', () => {
    render(<VisuallyHidden role="status">Copied</VisuallyHidden>);

    const text = screen.getByRole('status');
    expect(text.textContent).toBe('Copied');
    expect(getComputedStyle(text).position).toBe('absolute');
    expect(getComputedStyle(text).overflow).toBe('hidden');
  });

  it('labels a field without showing the label', () => {
    render(
      <>
        <VisuallyHiddenLabel htmlFor="search">
          Search sources
        </VisuallyHiddenLabel>
        <input id="search" />
      </>
    );

    expect(screen.getByLabelText('Search sources')).toBeTruthy();
    expect(getComputedStyle(screen.getByText('Search sources')).position).toBe(
      'absolute'
    );
  });
});
