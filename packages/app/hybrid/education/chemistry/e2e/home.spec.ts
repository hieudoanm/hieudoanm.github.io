import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Chemistry');
});

test('home lists the periodic table tool', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Chemistry' })).toBeVisible();
  await expect(page.getByTestId('tool-card-periodic-table')).toBeVisible();
});

test('navigating to periodic table works', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-periodic-table').click();
  await expect(
    page.getByRole('heading', { name: 'Periodic Table' })
  ).toBeVisible();
});

test('about page loads', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText('About')).toBeVisible();
  await expect(page.getByText('Chemistry')).toBeVisible();
});

test('downloads page loads', async ({ page }) => {
  await page.goto('/downloads');

  await expect(page.getByText('Downloads')).toBeVisible();
  await expect(page.getByText('Installers')).toBeVisible();
});

test('version page loads', async ({ page }) => {
  await page.goto('/version');

  await expect(page.getByText('Version')).toBeVisible();
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');

  await expect(page.getByText('404')).toBeVisible();
});
