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

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Code/);
  });

  test('displays welcome screen with Code heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Code')).toBeVisible();
  });

  test('displays subtitle text', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('text=Open a folder or file to start editing')
    ).toBeVisible();
  });

  test('has Open Folder button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("Open Folder")')).toBeVisible();
  });

  test('has Open File button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("Open File")')).toBeVisible();
  });
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
