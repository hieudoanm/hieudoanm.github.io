import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Photo/);
  });

  test('displays library heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Photo Library')).toBeVisible();
  });

  test('has upload button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Upload')).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});

test.describe('Albums Page', () => {
  test('loads albums page', async ({ page }) => {
    await page.goto('/albums');
    await expect(page.locator('text=Albums')).toBeVisible();
  });

  test('has new album button', async ({ page }) => {
    await page.goto('/albums');
    await expect(page.locator('text=New')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('displays theme selector', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Appearance')).toBeVisible();
  });
});

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Profile')).toBeVisible();
  });

  test('displays user information', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=User Information')).toBeVisible();
  });
});
