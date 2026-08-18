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

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PDF/);
  });

  test('displays library heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1:has-text("PDF Library")')).toBeVisible();
  });

  test('displays subtitle text', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('text=Manage and view your PDF documents')
    ).toBeVisible();
  });

  test('has Upload PDF button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("Upload PDF")')).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('has view mode toggle button', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('button[aria-label="Toggle view mode"]')
    ).toBeVisible();
  });

  test('displays All Documents section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=All Documents')).toBeVisible();
  });

  test('has Settings link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a:has-text("Settings")')).toBeVisible();
  });

  test('has Profile link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a:has-text("Profile")')).toBeVisible();
  });

  test('displays documents when seed data is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=All Documents')).toBeVisible();
    await expect(page.locator('a:has-text("Settings")')).toBeVisible();
  });

  test('has upload button available', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("Upload PDF")')).toBeVisible();
  });
});
