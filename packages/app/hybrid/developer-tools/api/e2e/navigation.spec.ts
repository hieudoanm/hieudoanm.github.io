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
  test('can navigate to about via header link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about/');
    await expect(page.locator('h1:has-text("API Client")')).toBeVisible();
  });

  test('can navigate to settings via header link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL('/settings/');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
  });

  test('can navigate to version via header link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Version' }).click();
    await expect(page).toHaveURL('/version/');
    await expect(
      page.locator('h1:has-text("API Client Version")')
    ).toBeVisible();
  });

  test('settings back button returns to home', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('header button.btn-circle').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByLabel('HTTP method')).toBeVisible();
  });
});
