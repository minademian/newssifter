import request from 'supertest';
import app from '../app';
import config from '../services/config';

describe('GET /sources', () => {
  it('returns every source with a distinct, sorted list of types', async () => {
    const response = await request(app).get(`/${config.apiPrefix}/sources`);

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(response.body.sources.length);
    expect(response.body.total).toBeGreaterThan(900);
    expect(response.body.types).toEqual(
      [...new Set(response.body.types)].sort()
    );
    expect(response.body.types).toEqual(
      expect.arrayContaining(['fake', 'bias', 'satire'])
    );
  });

  it('does not include the header row or blank types', async () => {
    const response = await request(app).get(`/${config.apiPrefix}/sources`);
    const { sources, types } = response.body;

    expect(sources.some((s: { url: string }) => s.url === 'url')).toBe(false);
    expect(types).not.toContain('type');
    expect(types).not.toContain('2nd type');
    expect(types).not.toContain('');
    expect(types).not.toContain(' ');
  });
});
