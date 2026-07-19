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

test('opens new connection modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('h2:has-text("New Connection")')).toBeVisible();
});

test('new connection modal has name input', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(
    page.locator('input[placeholder="Connection name"]')
  ).toBeVisible();
});

test('new connection modal has file path input', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('input[placeholder*="File path"]')).toBeVisible();
});

test('new connection modal has Read Only checkbox', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('text=Read Only')).toBeVisible();
});

test('new connection modal has Create button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('button:has-text("Create")')).toBeVisible();
});

test('new connection modal has Cancel button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('cancel button closes modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await expect(page.locator('h2:has-text("New Connection")')).toBeVisible();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('h2:has-text("New Connection")')).not.toBeVisible();
});

test('can fill in connection name', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  const nameInput = page.locator('input[placeholder="Connection name"]');
  await nameInput.fill('My Database');
  await expect(nameInput).toHaveValue('My Database');
});

test('can fill in file path', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  const pathInput = page.locator('input[placeholder*="File path"]');
  await pathInput.fill('/data/test.db');
  await expect(pathInput).toHaveValue('/data/test.db');
});

test('can toggle Read Only checkbox', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  const checkbox = page.locator('input[type="checkbox"]');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});

test('can create a new connection', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await page.locator('input[placeholder="Connection name"]').fill('Test DB');
  await page.locator('input[placeholder*="File path"]').fill('/data/test.db');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Test DB')).toBeVisible();
  await expect(page.getByText('/data/test.db')).toBeVisible();
});
