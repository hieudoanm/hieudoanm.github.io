import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Database/);
  });
  test('displays connections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Database Manager')).toBeVisible();
  });
  test('has new connection button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=New Connection')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });
});
