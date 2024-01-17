import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1').innerText()).toContain('News Sifter');
});

test('has input label', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('label').innerText()).toContain(
    'Submit a link to start a conversation about this article!'
  );
});

test('has button', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('button').innerText()).toContain('Tell Me!');
});
