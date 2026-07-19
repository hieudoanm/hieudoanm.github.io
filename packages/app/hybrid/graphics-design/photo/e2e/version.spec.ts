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

test('loads version page', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Photo Version')).toBeVisible();
});

test('displays version format', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=YYYY.MM.DD.hh.mm.ss').first()).toBeVisible();
});

test('displays Stable badge', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Stable')).toBeVisible();
});

test.describe('clipboard', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('copy version button works', async ({ page }) => {
    await page.goto('/version');
    await page.locator('button:has-text("Copy version")').click();
    await expect(page.locator('button:has-text("Copied")')).toBeVisible();
  });
});

test('displays version segments', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Year')).toBeVisible();
  await expect(page.locator('text=Month')).toBeVisible();
  await expect(page.locator('text=Day')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/version');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'version.png'),
  });
});
