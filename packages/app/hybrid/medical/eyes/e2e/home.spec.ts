import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Eyes');
});

test('home lists all three charts', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Eyes' })).toBeVisible();
  await expect(page.getByTestId('chart-card-snellen')).toBeVisible();
  await expect(page.getByTestId('chart-card-logmar')).toBeVisible();
  await expect(page.getByTestId('chart-card-tumbling-e')).toBeVisible();
});

test('snellen chart opens from home and closes back', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('chart-card-snellen').click();

  await expect(page.getByText('Snellen Visual Acuity Chart')).toBeVisible();
  await expect(page.getByText('20/200')).toBeVisible();

  await page.getByRole('button', { name: '✕' }).click();

  await expect(page).toHaveURL(/\/$/);
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');

  await expect(page.getByText('404')).toBeVisible();
});
