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

test('loads health page', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('h1:has-text("Password Health")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('back button navigates to home', async ({ page }) => {
  await page.goto('/health');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays overall score', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('text=Overall Score')).toBeVisible();
});

test('displays radial progress', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('.radial-progress')).toBeVisible();
});

test('displays Total count', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('text=Total')).toBeVisible();
});

test('displays Strong count', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('text=Strong')).toBeVisible();
});

test('displays Weak count', async ({ page }) => {
  await page.goto('/health');
  await expect(page.locator('text=Weak')).toBeVisible();
});
