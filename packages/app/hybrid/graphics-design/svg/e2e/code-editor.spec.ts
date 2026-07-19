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

test('loads code editor', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page).toHaveURL(/\/edit\/code/);
});

test('has back button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('displays SVG code', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('textarea')).toBeVisible();
});

test('has copy button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('button:has-text("Copy")')).toBeVisible();
});

test('has download button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('button:has-text("Download")')).toBeVisible();
});

test('shows preview panel', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('text=Preview')).toBeVisible();
});

test('shows line count', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await expect(page.locator('text=/Lines: \\d+/')).toBeVisible();
});

test('back navigates to editor', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="SVG Code"]').click();
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL(/\/edit\/?\?id=/);
});
