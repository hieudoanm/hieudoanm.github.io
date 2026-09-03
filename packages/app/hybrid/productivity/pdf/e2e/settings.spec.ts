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

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
  });

  test('has back button', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('a.btn-circle')).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('a.btn-circle').click();
    await expect(page).toHaveURL('/');
  });

  test('displays Theme section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h2:has-text("Theme")')).toBeVisible();
  });

  test('displays Viewer section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h2:has-text("Viewer")')).toBeVisible();
  });

  test('displays Annotations section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h2:has-text("Annotations")')).toBeVisible();
  });

  test('displays theme buttons', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('button:has-text("pdf-light")')).toBeVisible();
    await expect(page.locator('button:has-text("pdf-dark")')).toBeVisible();
    await expect(page.locator('button:has-text("pdf-light")')).toBeVisible();
  });

  test('displays Default Zoom slider', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Default Zoom')).toBeVisible();
  });

  test('displays Page Layout selector', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Page Layout')).toBeVisible();
  });

  test('displays annotation color picker', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Default Color')).toBeVisible();
  });

  test('displays stroke width slider', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Stroke Width')).toBeVisible();
  });

  test('Save Settings button is visible', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.locator('button:has-text("Save Settings")')
    ).toBeVisible();
  });

  test('can select a theme', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('button:has-text("pdf-dark")').click();
    await expect(
      page.locator('button:has-text("pdf-dark")').first()
    ).toHaveClass(/ring-2/);
  });

  test('can change page layout', async ({ page }) => {
    await page.goto('/settings');
    const select = page.locator('select').first();
    await select.selectOption('continuous');
    await expect(select).toHaveValue('continuous');
  });

  test('save shows success toast', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('button:has-text("Save Settings")').click();
    await expect(page.locator('text=Settings saved')).toBeVisible();
  });
});
