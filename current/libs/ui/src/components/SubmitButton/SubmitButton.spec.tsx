import { render, screen } from '@testing-library/react';

import { SubmitButton } from './SubmitButton';

describe('SubmitButton', () => {
  it('renders a button with its label', () => {
    render(<SubmitButton label="Check source" />);

    expect(screen.getByRole('button', { name: 'Check source' })).toBeTruthy();
  });
});
