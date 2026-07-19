import { test, expect } from '@playwright/test';

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
