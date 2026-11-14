import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import i18n from '@newssifter/services/i18n.browser.service';

import { ChatBot } from './ChatBot';

const mockLookup = (status: number, body?: unknown) => {
  global.fetch = jest.fn().mockResolvedValue({
    status,
    json: async () => body,
  }) as unknown as typeof fetch;
};

const submit = (value: string) => {
  fireEvent.change(screen.getByLabelText('Paste a news source URL'), {
    target: { value },
  });
  fireEvent.click(screen.getByRole('button', { name: /Check source/ }));
};

describe('ChatBot', () => {
  const scrollTo = jest.fn();

  beforeAll(() => {
    // jsdom does not implement scrollTo, which the conversation calls on render.
    HTMLElement.prototype.scrollTo = scrollTo;
  });

  beforeEach(() => scrollTo.mockClear());

  it('renders the greeting and the composer', () => {
    render(<ChatBot />);

    expect(screen.getByText('READY')).toBeTruthy();
    expect(screen.getByText('NEWS SIFTER · NOW')).toBeTruthy();
    expect(
      screen.getByRole('img', { name: 'News Sifter' }).getAttribute('src')
    ).toBe('/logo-full.jpeg');
    expect(screen.getByLabelText('Paste a news source URL')).toBeTruthy();
  });

  it('scrolls the conversation to the bottom when a message is added', async () => {
    mockLookup(404);
    render(<ChatBot />);
    scrollTo.mockClear();

    submit('unknown.example');

    await waitFor(() => expect(scrollTo).toHaveBeenCalled());
    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    );
  });

  it('shows the source type and the fake notice for a fake source', async () => {
    mockLookup(200, { url: 'abcnews.com.co', type1: 'fake' });
    render(<ChatBot />);

    submit('abcnews.com.co');

    await waitFor(
      () =>
        expect(
          screen.getByText('Yes, this source is in the database.')
        ).toBeTruthy(),
      { timeout: 3000 }
    );
    expect(screen.getByText('fake')).toBeTruthy();
    expect(screen.getByText('This is fake news')).toBeTruthy();
  });

  it('re-translates messages already on screen when the language changes', async () => {
    mockLookup(404);
    render(<ChatBot />);
    submit('unknown.example');
    await waitFor(
      () =>
        expect(
          screen.getByText(
            "Sorry, I couldn't find this source in our database."
          )
        ).toBeTruthy(),
      { timeout: 3000 }
    );

    i18n.addResourceBundle('test', 'translation', {
      chatbot: { 'not-found': 'NOT FOUND (test language)' },
    });
    await act(async () => {
      await i18n.changeLanguage('test');
    });

    expect(screen.getByText('NOT FOUND (test language)')).toBeTruthy();
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  it('shows the not-found message for an unknown source', async () => {
    mockLookup(404);
    render(<ChatBot />);

    submit('unknown.example');

    await waitFor(
      () =>
        expect(
          screen.getByText(
            "Sorry, I couldn't find this source in our database."
          )
        ).toBeTruthy(),
      { timeout: 3000 }
    );
  });
});
