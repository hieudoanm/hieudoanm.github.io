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

test.describe('View Mode Toggle', () => {
  test('can toggle between grid and list view', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[aria-label="Toggle view mode"]').click();
    await page.locator('button[aria-label="Toggle view mode"]').click();
  });
});
