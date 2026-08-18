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

test('displays back button', async ({ page }) => {
  await page.goto('/db');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('back button navigates to home', async ({ page }) => {
  await page.goto('/db');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays Schema toggle button', async ({ page }) => {
  await page.goto('/db');
  await expect(page.locator('button:has-text("Schema")')).toBeVisible();
});

test('displays Execute button', async ({ page }) => {
  await page.goto('/db');
  await expect(page.locator('button:has-text("Execute")')).toBeVisible();
});

test('displays SQL textarea', async ({ page }) => {
  await page.goto('/db');
  await expect(page.locator('textarea[placeholder*="SQL"]')).toBeVisible();
});

test('SQL textarea has default query', async ({ page }) => {
  await page.goto('/db');
  const textarea = page.locator('textarea[placeholder*="SQL"]');
  await expect(textarea).toHaveValue('SELECT * FROM users LIMIT 10');
});

test('can edit SQL query', async ({ page }) => {
  await page.goto('/db');
  const textarea = page.locator('textarea[placeholder*="SQL"]');
  await textarea.clear();
  await textarea.fill('SELECT * FROM products');
  await expect(textarea).toHaveValue('SELECT * FROM products');
});

test('shows placeholder when no query executed', async ({ page }) => {
  await page.goto('/db');
  await expect(
    page.locator('text=Execute a query to see results')
  ).toBeVisible();
});

test('displays Ctrl+Enter hint', async ({ page }) => {
  await page.goto('/db');
  await expect(page.locator('text=Ctrl+Enter to execute')).toBeVisible();
});

test('can toggle schema sidebar', async ({ page }) => {
  await page.goto('/db');
  await page.locator('button:has-text("Schema")').click();
  await page.locator('button:has-text("Schema")').click();
});
