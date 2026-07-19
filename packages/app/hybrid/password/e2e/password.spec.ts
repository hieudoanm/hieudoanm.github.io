import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Password/);
  });

  test('displays vault heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Password Vault')).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('has filter buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=All')).toBeVisible();
    await expect(page.locator('text=Login')).toBeVisible();
  });

  test('has new item button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=New')).toBeVisible();
  });
});

test.describe('Generator Page', () => {
  test('loads generator page', async ({ page }) => {
    await page.goto('/generator');
    await expect(page.locator('text=Password Generator')).toBeVisible();
  });

  test('displays length slider', async ({ page }) => {
    await page.goto('/generator');
    await expect(page.locator('input[type="range"]')).toBeVisible();
  });

  test('has option checkboxes', async ({ page }) => {
    await page.goto('/generator');
    await expect(page.locator('text=Uppercase')).toBeVisible();
    await expect(page.locator('text=Lowercase')).toBeVisible();
    await expect(page.locator('text=Numbers')).toBeVisible();
    await expect(page.locator('text=Symbols')).toBeVisible();
  });
});

test.describe('Health Page', () => {
  test('loads health page', async ({ page }) => {
    await page.goto('/health');
    await expect(page.locator('text=Password Health')).toBeVisible();
  });

  test('displays overall score', async ({ page }) => {
    await page.goto('/health');
    await expect(page.locator('text=Overall Score')).toBeVisible();
  });

  test('displays stats cards', async ({ page }) => {
    await page.goto('/health');
    await expect(page.locator('text=Total')).toBeVisible();
    await expect(page.locator('text=Strong')).toBeVisible();
    await expect(page.locator('text=Weak')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });
});

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Profile')).toBeVisible();
  });
});
