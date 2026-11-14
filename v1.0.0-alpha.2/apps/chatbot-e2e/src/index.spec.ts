import { test, expect } from '@playwright/test';

test('app has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1').innerText()).toContain('News Sifter');
});

test('chatbot has initial message', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h4').innerText()).toContain(
    'Submit a link to start a conversation about this article!'
  );
});

test('chatbot has button', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('button').innerText()).toContain('Tell Me!');
});

test('chatbot has input field', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('input').getAttribute('placeholder')).toContain(
    'Your link...'
  );
});
