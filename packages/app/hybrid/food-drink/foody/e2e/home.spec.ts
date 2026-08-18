import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Foody');
});

test('home lists the food randomizer tool', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Foody' })).toBeVisible();
  await expect(page.getByTestId('tool-card-randomizer')).toBeVisible();
});

test('navigating to food randomizer works', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-randomizer').click();
  await expect(
    page.getByRole('heading', { name: 'Food Randomizer' })
  ).toBeVisible();
});

test('about page loads', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText('About')).toBeVisible();
  await expect(page.getByText('Foody')).toBeVisible();
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
