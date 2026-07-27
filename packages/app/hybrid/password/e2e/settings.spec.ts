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

test('back button navigates to home', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays Appearance section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Appearance')).toBeVisible();
});

test('displays Security section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Security')).toBeVisible();
});

test('displays theme dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('select').first()).toBeVisible();
});

test('displays Auto-lock timeout slider', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Auto-lock timeout')).toBeVisible();
});

test('displays Clipboard clear slider', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Clipboard clear')).toBeVisible();
});

test('Save Settings button is visible', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('button:has-text("Save Settings")')).toBeVisible();
});

test('can change theme', async ({ page }) => {
  await page.goto('/settings');
  const themeSelect = page.locator('select').first();
  await themeSelect.selectOption('light');
  await expect(themeSelect).toHaveValue('light');
});

test('save shows success toast', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('button:has-text("Save Settings")').click();
  await expect(page.locator('text=Settings saved')).toBeVisible();
});
