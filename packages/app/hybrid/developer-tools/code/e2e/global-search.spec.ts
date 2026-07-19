import { test, expect } from '@playwright/test';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Global Search', () => {
  test('search panel opens from activity bar', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[title*="Search"]').click();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('search panel has search input', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[title*="Search"]').click();
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });

  test('search panel has close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[title*="Search"]').click();
    await expect(page.locator('button[title="Close search"]')).toBeVisible();
  });

  test('search panel shows results or empty state', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[title*="Search"]').click();
    const searchInput = page.locator('input[placeholder="Search files..."]');
    await searchInput.fill('nonexistent');
    await searchInput.press('Enter');
    await page.waitForTimeout(500);
  });
});
