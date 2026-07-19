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
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('back navigates to home', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays User Information section', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('h2:has-text("User Information")')).toBeVisible();
});

test('has avatar preview', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('.avatar').first()).toBeVisible();
});

test('has display name input', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('input').first()).toBeVisible();
});

test('has email input', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('has Save Profile button', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('button:has-text("Save Profile")')).toBeVisible();
});

test('can fill display name', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('input').first().clear();
  await page.locator('input').first().fill('Test User');
});

test('can fill email', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('input[type="email"]').fill('test@example.com');
});

test('save shows success toast', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('button:has-text("Save Profile")').click();
  await expect(page.locator('text=Profile saved')).toBeVisible();
});
