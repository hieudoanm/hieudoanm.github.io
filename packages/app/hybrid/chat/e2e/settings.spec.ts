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
    await expect(
      page.locator('header button.btn-circle').first()
    ).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('header button.btn-circle').first().click();
    await expect(page).toHaveURL('/');
  });

  test('displays Appearance section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Appearance')).toBeVisible();
  });

  test('displays theme dropdown', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('theme dropdown has multiple options', async ({ page }) => {
    await page.goto('/settings');
    const themeSelect = page.locator('select').first();
    const options = await themeSelect.locator('option').count();
    expect(options).toBeGreaterThan(1);
  });

  test('displays AI Model section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h2:has-text("AI Model")')).toBeVisible();
  });

  test('displays Default Model label', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Default Model')).toBeVisible();
  });

  test('displays Custom Instructions section', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Custom Instructions')).toBeVisible();
  });

  test('displays system prompt textarea', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.locator('textarea[placeholder*="custom instructions"]')
    ).toBeVisible();
  });

  test('displays prompt template buttons', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Templates')).toBeVisible();
    await expect(page.locator('.btn-outline.btn-sm').first()).toBeVisible();
  });

  test('clicking a template fills the system prompt', async ({ page }) => {
    await page.goto('/settings');
    const templateButton = page.locator('.btn-outline.btn-sm').first();
    await templateButton.click();
    const textarea = page.locator(
      'textarea[placeholder*="custom instructions"]'
    );
    const value = await textarea.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('Save Settings button is visible', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.locator('button:has-text("Save Settings")')
    ).toBeVisible();
  });

  test('can change theme selection', async ({ page }) => {
    await page.goto('/settings');
    const themeSelect = page.locator('select').first();
    await themeSelect.selectOption('light');
    await expect(themeSelect).toHaveValue('light');
  });

  test('save settings button works', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('button:has-text("Save Settings")').click();
  });
});
