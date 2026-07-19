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
    await expect(page.locator('header button.btn-circle')).toBeVisible();
  });

  test('displays Appearance section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Appearance')).toBeVisible();
  });

  test('theme dropdown defaults to api-light', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('select')).toHaveValue('api-light');
  });

  test('theme dropdown has two options', async ({ page }) => {
    await page.goto('/settings');
    const options = await page.locator('select option').count();
    expect(options).toBe(2);
  });

  test('can change theme selection', async ({ page }) => {
    await page.goto('/settings');
    const themeSelect = page.locator('select');
    await themeSelect.selectOption('api-dark');
    await expect(themeSelect).toHaveValue('api-dark');
  });

  test('displays Data section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Data')).toBeVisible();
  });

  test('has clear history button', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.getByRole('button', { name: 'Clear history and draft' })
    ).toBeVisible();
  });
});
