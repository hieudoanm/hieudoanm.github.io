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

test('can navigate between all pages', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');

  await page.goto('/settings');
  await expect(page.locator('h1:has-text("Settings")')).toBeVisible();

  await page.goto('/profile');
  await expect(page.locator('h1:has-text("Profile")')).toBeVisible();

  await page.goto('/version');
  await expect(page.locator('text=Projects Version')).toBeVisible();

  await page.goto('/about');
  await expect(page.locator('text=About')).toBeVisible();
});

test('settings page loads directly', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
});

test('profile page loads directly', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
});
