import assert from 'node:assert/strict';
import { test } from 'node:test';
import app from './app';

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', resolve));

  try {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('The test server did not expose a TCP address');
    }

    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test('find flags listed domains from bare domains and full URLs', async () => {
  await withServer(async (baseUrl) => {
    const bareDomain = await fetch(`${baseUrl}/find?url=abcnews.com.co`);
    assert.equal(bareDomain.status, 200);
    assert.deepEqual(await bareDomain.json(), {
      url: 'abcnews.com.co',
      questionable: true,
    });

    const fullUrl = await fetch(
      `${baseUrl}/find?url=${encodeURIComponent('https://www.rt.com/news')}`
    );
    assert.deepEqual(await fullUrl.json(), {
      url: 'https://www.rt.com/news',
      questionable: true,
    });
  });
});

test('find returns false for unlisted domains and rejects invalid parameters', async () => {
  await withServer(async (baseUrl) => {
    const unlisted = await fetch(`${baseUrl}/find?url=example.com`);
    assert.deepEqual(await unlisted.json(), {
      url: 'example.com',
      questionable: false,
    });

    const missing = await fetch(`${baseUrl}/find`);
    assert.equal(missing.status, 400);

    const invalidProtocol = await fetch(
      `${baseUrl}/find?url=${encodeURIComponent('ftp://example.com')}`
    );
    assert.equal(invalidProtocol.status, 400);
  });
});
