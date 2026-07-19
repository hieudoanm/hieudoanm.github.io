import { test, expect } from '@playwright/test';
import path from 'path';

test('app opens directly into the viewer', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('demo-brainbow.tif')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Open version history' })
  ).toBeVisible();
});

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Brainbow');
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
