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

  await page.goto('/about');
  await expect(page.locator('h1:has-text("Colors")')).toBeVisible();

  await page.goto('/version');
  await expect(page.locator('h1:has-text("Version")')).toBeVisible();

  await page.goto('/downloads');
  await expect(page.locator('h1:has-text("Installers")')).toBeVisible();
});

test('home links navigate to tool pages', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-converter"]').click();
  await expect(page).toHaveURL(/\/converter/);
});

test('can navigate to about from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('a:has-text("About")').first().click();
  await expect(page).toHaveURL(/\/about/);
});

test('can navigate to downloads from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('a:has-text("Downloads")').first().click();
  await expect(page).toHaveURL(/\/downloads/);
});

test('can navigate to version from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('a:has-text("Version")').first().click();
  await expect(page).toHaveURL(/\/version/);
});
