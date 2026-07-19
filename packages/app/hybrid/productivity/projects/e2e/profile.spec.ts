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

test('loads profile page', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('button').first()).toBeVisible();
});

test('displays User Information section', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('h2:has-text("User Information")')).toBeVisible();
});

test('has avatar placeholder', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('.avatar').first()).toBeVisible();
});

test('has username input', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('input[type="text"]')).toBeVisible();
});

test('has email input', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('has Save button', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('button:has-text("Save")')).toBeVisible();
});

test('can fill username', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('input[type="text"]').clear();
  await page.locator('input[type="text"]').fill('Test User');
});

test('can fill email', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('input[type="email"]').fill('test@example.com');
});

test('save shows success toast', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('button:has-text("Save")').click();
  await expect(page.locator('text=Profile saved')).toBeVisible();
});
