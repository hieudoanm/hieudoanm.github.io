import { test, expect } from '@playwright/test';
import path from 'path';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Lingo');
});

test('home lists all three courses', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Lingo' })).toBeVisible();
  for (const slug of ['flashcards', 'english', 'sign']) {
    await expect(page.getByTestId(`tool-card-${slug}`)).toBeVisible();
  }
});

test('flashcard flow completes from home', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-flashcards').click();
  await expect(page.getByRole('heading', { name: 'Flashcards' })).toBeVisible();

  await expect(page.getByTestId('language-select')).toHaveValue('korean');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText(/2 \//)).toBeVisible();

  await page.getByTestId('theme-toggle').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(theme).toBe('lingo-dark');
});

test('dictionary looks up a word', async ({ page }) => {
  await page.goto('/english/');

  await page.getByPlaceholder('Type a word...').fill('hello');
  await expect(page.getByRole('heading', { name: 'hello' })).toBeVisible({
    timeout: 15000,
  });
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');

  await expect(page.getByText('404')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
