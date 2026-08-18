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
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('displays app name', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1:has-text("PDF")')).toBeVisible();
  });

  test('displays app description', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=PDF viewer and editor')).toBeVisible();
  });

  test('displays version', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=v0.0.1')).toBeVisible();
  });

  test('displays format info', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('span.font-mono:has-text("PDF")')).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('.badge:has-text("Stable")')).toBeVisible();
  });
});
