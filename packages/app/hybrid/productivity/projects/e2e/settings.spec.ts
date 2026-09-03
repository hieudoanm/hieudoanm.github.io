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
  await expect(page.locator('button').first()).toBeVisible();
});

test('displays Appearance section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Appearance")')).toBeVisible();
});

test('displays Defaults section', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('h2:has-text("Defaults")')).toBeVisible();
});

test('has theme dropdown', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.locator('select').first()).toBeVisible();
});

test('theme dropdown has two options', async ({ page }) => {
  await page.goto('/settings');
  const select = page.locator('select').first();
  await expect(select).toBeVisible();
  const options = await select.locator('option').allTextContents();
  expect(
    options.some((o) => o.toLowerCase().includes('projects-light'))
  ).toBeTruthy();
  expect(
    options.some((o) => o.toLowerCase().includes('projects-dark'))
  ).toBeTruthy();
  expect(await page.locator('select').first().locator('option').count()).toBe(
    2
  );
});

test('can change theme', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('select').first().selectOption('projects-dark');
});

test('has default view dropdown', async ({ page }) => {
  await page.goto('/settings');
  const viewSelect = page.locator('select').nth(1);
  await expect(viewSelect).toBeVisible();
});

test('default view has options', async ({ page }) => {
  await page.goto('/settings');
  const viewSelect = page.locator('select').nth(1);
  await expect(viewSelect).toBeVisible();
  const options = await viewSelect.locator('option').allTextContents();
  expect(options.some((o) => o.toLowerCase().includes('kanban'))).toBeTruthy();
  expect(options.some((o) => o.toLowerCase().includes('list'))).toBeTruthy();
  expect(
    options.some((o) => o.toLowerCase().includes('calendar'))
  ).toBeTruthy();
  expect(
    options.some((o) => o.toLowerCase().includes('timeline'))
  ).toBeTruthy();
});

test('can change default view', async ({ page }) => {
  await page.goto('/settings');
  await page.locator('select').nth(1).selectOption('list');
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
