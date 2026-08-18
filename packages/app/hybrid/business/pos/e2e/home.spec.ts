import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders the app title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'POS' })).toBeVisible();
  });

  test('renders navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Downloads' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Version' })).toBeVisible();
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about/');
  });

  test('navigates to downloads page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Downloads' }).click();
    await expect(page).toHaveURL('/downloads/');
  });

  test('navigates to version page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Version' }).click();
    await expect(page).toHaveURL('/version/');
  });
});
