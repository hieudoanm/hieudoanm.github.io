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

test('loads about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('text=About')).toBeVisible();
});

test('displays app name', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('h1:has-text("Password")')).toBeVisible();
});

test('displays app description', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('text=Secure password manager')).toBeVisible();
});

test('displays version', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('text=v0.0.1')).toBeVisible();
});

test('displays security info', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('text=AES-256')).toBeVisible();
});

test('displays Stable badge', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.badge:has-text("Stable")')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/about');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'about.png'),
  });
});
