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

test.describe('PDF Edit', () => {
  test('displays loading when no document', async ({ page }) => {
    await page.goto('/pdf/edit');
    await expect(page.locator('.loading-spinner').first()).toBeVisible();
  });
});
