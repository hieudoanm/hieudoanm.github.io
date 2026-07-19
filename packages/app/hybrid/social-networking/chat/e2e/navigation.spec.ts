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

test.describe('Navigation', () => {
  test('can navigate between all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.goto('/settings');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();

    await page.goto('/profile');
    await expect(page.locator('h1:has-text("Profile")')).toBeVisible();

    await page.goto('/version');
    await expect(page.locator('text=Chat Version')).toBeVisible();

    await page.goto('/about');
    await expect(page.locator('text=About')).toBeVisible();
  });
});
