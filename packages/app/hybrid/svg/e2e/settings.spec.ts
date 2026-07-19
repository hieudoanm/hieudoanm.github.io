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

test('displays Canvas section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Canvas")')).toBeVisible();
});

test('displays Export section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Export")')).toBeVisible();
});

test('has theme dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('select').first()).toBeVisible();
});

test('can change theme', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('select').first().selectOption('light');
});

test('has grid size input', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Grid Size')).toBeVisible();
  await expect(page.locator('input[type="number"]').first()).toBeVisible();
});

test('has snap to grid checkbox', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Snap to grid')).toBeVisible();
  await expect(page.locator('input[type="checkbox"]').first()).toBeVisible();
});

test('has show grid checkbox', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Show grid')).toBeVisible();
});

test('has show rulers checkbox', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Show rulers')).toBeVisible();
});

test('has export format dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Default Format')).toBeVisible();
});

test('has export scale dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('text=Export Scale')).toBeVisible();
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

test('can toggle snap to grid', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('input[type="checkbox"]').first().click();
  await page.locator('input[type="checkbox"]').first().click();
});
