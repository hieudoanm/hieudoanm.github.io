import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SVG/);
  });

  test('displays SVG Library heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=SVG Library')).toBeVisible();
  });

  test('has new document button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=New Document')).toBeVisible();
  });

  test('has templates button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Templates')).toBeVisible();
  });
});

test.describe('Document Creation', () => {
  test('opens new document modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=New Document').click();
    await expect(page.locator('text=Create')).toBeVisible();
  });

  test('opens template modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=Templates').click();
    await expect(page.locator('text=Choose Template')).toBeVisible();
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

  test('displays canvas settings', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Canvas')).toBeVisible();
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
