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

test('loads settings page', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('back navigates to home', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays Appearance section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Appearance")')).toBeVisible();
});

test('displays Export section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Export")')).toBeVisible();
});

test('has theme dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('select').first()).toBeVisible();
});

test('theme dropdown has options', async ({ page }) => {
  await page.goto('/settings');
  const select = page.locator('select').first();
  await expect(select.locator('option')).toHaveCount(31, { timeout: 10000 });
});

test('can change theme', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('select').first().selectOption('light');
});

test('has format dropdown', async ({ page }) => {
  await page.goto('/settings');
  const formatSelect = page.locator('select').nth(1);
  await expect(formatSelect).toBeVisible();
});

test('can change format', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('select').nth(1).selectOption('jpeg');
});

test('has quality slider', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=/Quality/')).toBeVisible();
  await expect(page.locator('text=85%')).toBeVisible();
});

test('Save Settings button is visible', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('button:has-text("Save Settings")')).toBeVisible();
});

test('save shows success toast', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('button:has-text("Save Settings")').click();
  await expect(page.locator('text=Settings saved')).toBeVisible();
});
