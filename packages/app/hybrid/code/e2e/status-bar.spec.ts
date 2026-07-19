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

test.describe('Status Bar', () => {
  test('displays sidebar toggle in status bar', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('.bg-base-200.border-base-100 button').first()
    ).toBeVisible();
  });
});
