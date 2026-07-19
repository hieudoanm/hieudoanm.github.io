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

test('loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Database/);
});

test('displays Database Manager heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1:has-text("Database Manager")')).toBeVisible();
});

test('has New Connection button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New Connection")')).toBeVisible();
});

test('has search input', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
