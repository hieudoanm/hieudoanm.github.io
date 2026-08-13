import { test, expect } from '@playwright/test';
import path from 'path';

test.use({ viewport: { width: 375, height: 667 } });

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Password/);
});

test('displays vault heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1:has-text("Password Vault")')).toBeVisible();
});

test('has search input', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
});

test('has filter buttons for all types', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'All', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Login', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Card', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Identity', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Note', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Ssh', exact: true })
  ).toBeVisible();
});

test('has New button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New")')).toBeVisible();
});

test('has Generator link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a:has-text("Generator")')).toBeVisible();
});

test('has Health link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a:has-text("Health")')).toBeVisible();
});
