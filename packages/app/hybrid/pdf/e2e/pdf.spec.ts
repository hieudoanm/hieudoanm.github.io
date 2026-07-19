import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PDF/);
  });

  test('displays library heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=PDF Library')).toBeVisible();
  });

  test('has upload button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Upload PDF')).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('displays document cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=All Documents')).toBeVisible();
  });
});

test.describe('PDF Viewer', () => {
  test('navigates to viewer', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=All Documents').waitFor();
    await page.locator('[class*="cursor-pointer"]').first().click();
    await expect(page).toHaveURL(/\/pdf\//);
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('displays theme selector', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Theme')).toBeVisible();
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
