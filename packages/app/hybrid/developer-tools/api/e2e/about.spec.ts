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

test.describe('About Page', () => {
  test('loads about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1:has-text("API Client")')).toBeVisible();
  });

  test('displays About label', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=About').first()).toBeVisible();
  });

  test('displays description', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=Minimal API client')).toBeVisible();
  });

  test('displays stack info rows', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=Next.js 16')).toBeVisible();
    await expect(page.locator('text=TypeScript 6')).toBeVisible();
    await expect(page.locator('text=Client-side fetch')).toBeVisible();
  });

  test('displays version badge', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=v0.0.1')).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('span:has-text("Stable")')).toBeVisible();
  });
});
