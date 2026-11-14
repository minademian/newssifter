import { render } from '@testing-library/react';

import { ChatBot } from './ChatBot';

describe('Chatbot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatBot />);
    expect(baseElement).toBeTruthy();
  });
});
