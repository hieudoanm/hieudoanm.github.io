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

test.describe('Version Page', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('loads version page', async ({ page }) => {
    await page.goto('/version');
    await expect(
      page.locator('h1:has-text("API Client Version")')
    ).toBeVisible();
  });

  test('displays Current deployment label', async ({ page }) => {
    await page.goto('/version');
    await expect(
      page.getByText('Current deployment', { exact: true })
    ).toBeVisible();
  });

  test('displays version segments', async ({ page }) => {
    await page.goto('/version');
    await expect(page.getByText('Year', { exact: true })).toBeVisible();
    await expect(page.getByText('Month', { exact: true })).toBeVisible();
    await expect(page.getByText('Day', { exact: true })).toBeVisible();
  });

  test('displays format badge', async ({ page }) => {
    await page.goto('/version');
    await expect(
      page.locator('span:has-text("Format: YYYY.MM.DD.hh.mm.ss")')
    ).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await page.goto('/version');
    await expect(page.locator('span:has-text("Stable")')).toBeVisible();
  });

  test('copy version button is visible', async ({ page }) => {
    await page.goto('/version');
    await expect(page.locator('button:has-text("Copy version")')).toBeVisible();
  });

  test('clicking copy changes text to Copied', async ({ page }) => {
    await page.goto('/version');
    await page.locator('button:has-text("Copy version")').click();
    await expect(page.locator('button:has-text("Copied")')).toBeVisible();
  });

  test('copy text reverts back after delay', async ({ page }) => {
    await page.goto('/version');
    await page.locator('button:has-text("Copy version")').click();
    await expect(page.locator('button:has-text("Copied")')).toBeVisible();
    await expect(page.locator('button:has-text("Copy version")')).toBeVisible({
      timeout: 3000,
    });
  });
});
