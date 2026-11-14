import { render, screen } from '@testing-library/react';

import { TextField } from './TextField';

describe('TextField', () => {
  it('renders a text input inside its label', () => {
    render(<TextField label="Article" />);

    const input = screen.getByLabelText('Article') as HTMLInputElement;
    expect(input.type).toBe('text');
    expect(input.name).toBe('article');
  });
});
