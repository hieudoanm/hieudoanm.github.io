import { test, expect } from '@playwright/test';

test('app opens into the import landing page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('button', { name: 'Import study' })
  ).toBeVisible();
});

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('MRI');
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');

  await expect(page.getByText('404')).toBeVisible();
});
