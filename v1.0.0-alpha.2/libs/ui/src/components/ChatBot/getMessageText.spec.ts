import i18n from '@newssifter/services/i18n.browser.service';
import { getMessageText } from './getMessageText';

const t = i18n.t.bind(i18n);

describe('getMessageText', () => {
  it('returns the typed text of a user message', () => {
    expect(getMessageText({ sender: 'user', text: 'dailywire.com' }, t)).toBe(
      'dailywire.com'
    );
  });

  it.each([
    ['found', 'Yes, this source is in the database.'],
    ['not-found', "Sorry, I couldn't find this source in our database."],
    [
      'server-error',
      'Error: The server encountered an error. Please try again.',
    ],
    ['timeout', 'Error: The lookup timed out. Please try again.'],
    [
      'network-error',
      'Error: Could not reach the lookup service. Please try again.',
    ],
  ] as const)('words an assistant "%s" message', (kind, text) => {
    expect(getMessageText({ sender: 'assistant', kind }, t)).toBe(text);
  });

  it('fills in the status for a status error', () => {
    expect(
      getMessageText(
        { sender: 'assistant', kind: 'status-error', status: 418 },
        t
      )
    ).toBe('Error: The lookup failed with status 418.');
  });
});
