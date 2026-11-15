import teardown from './global-teardown';

declare global {
  // eslint-disable-next-line no-var
  var __TEARDOWN_MESSAGE__: string;
}

// Vitest runs the function returned here as the global teardown.
export default async function setup() {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';

  return teardown;
}
