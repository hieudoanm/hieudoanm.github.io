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

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
  });

  test('has back button', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('a.btn-circle')).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/profile');
    await page.locator('a.btn-circle').click();
    await expect(page).toHaveURL('/');
  });

  test('displays User Information section', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=User Information')).toBeVisible();
  });

  test('displays demo user info', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Demo User')).toBeVisible();
    await expect(page.locator('text=demo@example.com')).toBeVisible();
  });

  test('displays Statistics section', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Statistics')).toBeVisible();
  });

  test('displays Documents count', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Documents')).toBeVisible();
  });

  test('displays Total Pages count', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Total Pages')).toBeVisible();
  });
});
