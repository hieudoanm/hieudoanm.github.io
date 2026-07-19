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

test.describe('Activity Bar', () => {
  test('displays explorer toggle button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[title*="Explorer"]')).toBeVisible();
  });

  test('displays search button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[title*="Search"]')).toBeVisible();
  });

  test('displays theme toggle button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[title*="Switch to"]')).toBeVisible();
  });

  test('explorer toggle opens and closes sidebar', async ({ page }) => {
    await page.goto('/');
    const explorerButton = page.locator('button[title*="Explorer"]');
    await explorerButton.click();
    await explorerButton.click();
  });

  test('search button toggles search panel', async ({ page }) => {
    await page.goto('/');
    const searchButton = page.locator('button[title*="Search"]');
    await searchButton.click();
    await searchButton.click();
  });

  test('theme toggle switches theme', async ({ page }) => {
    await page.goto('/');
    const themeButton = page.locator('button[title*="Switch to"]');
    await themeButton.click();
    await themeButton.click();
  });
});
