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

test.describe('File Explorer', () => {
  test('explorer sidebar is visible by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=EXPLORER')).toBeVisible();
  });

  test('explorer has Open Folder button when empty', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('button:has-text("Open Folder")').first()
    ).toBeVisible();
  });

  test('explorer toolbar has new file button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[title="New File"]')).toBeVisible();
  });

  test('explorer toolbar has new folder button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[title="New Folder"]')).toBeVisible();
  });

  test('explorer toolbar has collapse all button when folder is loaded', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('button[title="Close sidebar"]').click();
    await expect(page.locator('text=EXPLORER')).not.toBeVisible();
  });

  test('can close sidebar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=EXPLORER')).toBeVisible();
    await page.locator('button[title="Close sidebar"]').click();
  });
});
