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

test('displays theme dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('select').first()).toBeVisible();
});

test('theme dropdown has multiple options', async ({ page }) => {
  await page.goto('/settings');
  const themeSelect = page.locator('select').first();
  const options = await themeSelect.locator('option').count();
  expect(options).toBeGreaterThan(1);
});

test('displays Editor section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Editor')).toBeVisible();
});

test('displays Font Size slider', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Font Size')).toBeVisible();
});

test('displays Query Timeout slider', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Query Timeout')).toBeVisible();
});

test('Save Settings button is visible', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('button:has-text("Save Settings")')).toBeVisible();
});

test('can change theme selection', async ({ page }) => {
  await page.goto('/settings');
  const themeSelect = page.locator('select').first();
  await themeSelect.selectOption('light');
  await expect(themeSelect).toHaveValue('light');
});
