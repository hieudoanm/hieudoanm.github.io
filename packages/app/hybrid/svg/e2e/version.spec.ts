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

test.describe(() => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('loads version page', async ({ page }) => {
    await page.goto('/version');
    await expect(page.locator('text=SVG Version')).toBeVisible();
  });

  test('displays version format', async ({ page }) => {
    await page.goto('/version');
    await expect(page.locator('text=YYYY.MM.DD.hh.mm.ss')).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await page.goto('/version');
    await expect(page.locator('text=Stable')).toBeVisible();
  });

  test('copy version button works', async ({ page }) => {
    await page.goto('/version');
    await page.locator('button:has-text("Copy version")').click();
    await expect(page.locator('button:has-text("Copied")')).toBeVisible();
  });
});
