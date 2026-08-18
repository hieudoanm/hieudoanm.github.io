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

test('opens new item modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('h2:has-text("New Item")')).toBeVisible();
});

test('modal has type selector', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.getByLabel('Item type')).toBeVisible();
});

test('modal has title input', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('input[placeholder="Title"]')).toBeVisible();
});

test('modal has Create button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('button:has-text("Create")')).toBeVisible();
});

test('modal has Cancel button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('cancel closes modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('h2:has-text("New Item")')).not.toBeVisible();
});

test('can select different types', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  const select = page.getByLabel('Item type');
  await select.selectOption('card');
  await expect(select).toHaveValue('card');
});

test('can fill in title', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  const titleInput = page.locator('input[placeholder="Title"]');
  await titleInput.fill('My New Login');
  await expect(titleInput).toHaveValue('My New Login');
});

test('can create a new login item', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New")')).toBeVisible();
  await page.locator('button:has-text("New")').click();
  await page.locator('input[placeholder="Title"]').fill('Test Account');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('h2:has-text("New Item")')).not.toBeVisible();
});

test('can create a new card item', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New")')).toBeVisible();
  await page.locator('button:has-text("New")').click();
  await page.getByLabel('Item type').selectOption('card');
  await page.locator('input[placeholder="Title"]').fill('My Credit Card');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('h2:has-text("New Item")')).not.toBeVisible();
});
