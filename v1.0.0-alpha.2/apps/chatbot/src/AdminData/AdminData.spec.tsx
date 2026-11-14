import { render, screen } from '@testing-library/react';
import '@newssifter/services/i18n.browser.service';

import AdminDataPage from './AdminData';

describe('AdminDataPage', () => {
  beforeAll(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        total: 1,
        types: ['fake'],
        sources: [{ url: 'abcnews.com.co', type1: 'fake' }],
      }),
    }) as unknown as typeof fetch;
  });

  it('shows the source data inside the app shell, with a link back and no footer', async () => {
    render(<AdminDataPage />);

    expect(screen.getByRole('link', { name: 'News Sifter home' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Back to lookup' })).toBeTruthy();
    expect(screen.getByText('Source data')).toBeTruthy();
    expect(await screen.findByText('abcnews.com.co')).toBeTruthy();
    expect(screen.queryByText('Pause. Check. Think critically.')).toBeNull();
  });
});
