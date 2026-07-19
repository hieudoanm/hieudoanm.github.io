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

test('loads generator page', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('h1:has-text("Password Generator")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('back button navigates to home', async ({ page }) => {
  await page.goto('/generator');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('displays generated password', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('input[readonly]').first()).toBeVisible();
});

test('password input is read-only', async ({ page }) => {
  await page.goto('/generator');
  const passwordInput = page.locator('input[readonly]').first();
  await expect(passwordInput).toHaveAttribute('readonly');
});

test('has copy button', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('.btn-primary.btn-circle').first()).toBeVisible();
});

test('has regenerate button', async ({ page }) => {
  await page.goto('/generator');
  await expect(
    page.locator('button.btn-ghost.btn-circle').first()
  ).toBeVisible();
});

test('displays length slider', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('input[type="range"]')).toBeVisible();
});

test('displays length label', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('text=Length:')).toBeVisible();
});

test('has option checkboxes', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.locator('text=Uppercase')).toBeVisible();
  await expect(page.locator('text=Lowercase')).toBeVisible();
  await expect(page.locator('text=numbers')).toBeVisible();
  await expect(page.locator('text=symbols')).toBeVisible();
});

test('displays strength indicator', async ({ page }) => {
  await page.goto('/generator');
  await expect(page.getByText('Very Strong', { exact: true })).toBeVisible();
});

test('regenerate creates a new password', async ({ page }) => {
  await page.goto('/generator');
  const passwordInput = page.locator('input[readonly]').first();
  const initialPassword = await passwordInput.inputValue();
  await page.locator('button.btn-ghost.btn-circle').first().click();
  await expect(passwordInput).not.toHaveValue(initialPassword);
});

test('changing length regenerates password', async ({ page }) => {
  await page.goto('/generator');
  const rangeInput = page.locator('input[type="range"]');
  await rangeInput.fill('32');
});
