import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Code/);
  });

  test('displays welcome screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Open Folder')).toBeVisible();
  });

  test('has open file button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Open File')).toBeVisible();
  });
});

test.describe('Status Bar', () => {
  test('displays line and column info', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Ln')).toBeVisible();
  });
});

test.describe('Global Search', () => {
  test('opens search panel', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+Shift+f');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});
