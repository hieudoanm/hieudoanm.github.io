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

test('back button navigates to home', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays User Information section', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('text=User Information')).toBeVisible();
});

test('displays avatar placeholder', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('.avatar')).toBeVisible();
});

test('Save button is visible', async ({ page }) => {
  await page.goto('/profile');
  await expect(page.locator('button:has-text("Save")')).toBeVisible();
});

test('save shows success toast', async ({ page }) => {
  await page.goto('/profile');
  await page.locator('button:has-text("Save")').click();
  await expect(page.locator('text=Profile saved')).toBeVisible();
});
