import { generateSampleUrl } from './sampleUrl';

describe('generateSampleUrl', () => {
  it('builds an https article URL on the source domain', () => {
    expect(generateSampleUrl('dailywire.com')).toMatch(
      /^https:\/\/dailywire\.com\/20\d{2}\/(0[1-9]|1[0-2])\/[a-z-]+$/
    );
  });

  it('keeps a path that is already part of the source', () => {
    expect(generateSampleUrl('example.com/news/')).toMatch(
      /^https:\/\/example\.com\/news\/20\d{2}\//
    );
  });

  it('does not double the scheme', () => {
    expect(generateSampleUrl('https://example.com')).toMatch(
      /^https:\/\/example\.com\/20\d{2}\//
    );
  });
});
