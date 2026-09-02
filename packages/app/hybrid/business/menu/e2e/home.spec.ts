import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders the Menus dashboard heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Menus' })).toBeVisible();
  });

  test('creates a restaurant', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('e.g. The Golden Fork').fill('e2e Restaurant');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('e2e Restaurant').first()).toBeVisible();
  });
});
