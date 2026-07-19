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

test('loads version page', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('h1:has-text("Version")')).toBeVisible();
});

test('displays current deployment label', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Current deployment')).toBeVisible();
});

test('displays version segments', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Year')).toBeVisible();
  await expect(page.locator('text=Month')).toBeVisible();
  await expect(page.locator('text=Day')).toBeVisible();
});

test('displays time segments', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Hour')).toBeVisible();
  await expect(page.locator('text=Min')).toBeVisible();
  await expect(page.locator('text=Sec')).toBeVisible();
});

test('displays format hint', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('text=Format: YYYY.MM.DD.hh.mm.ss')).toBeVisible();
});

test('displays Stable badge', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('.badge:has-text("Stable")')).toBeVisible();
});

test('has Copy version button', async ({ page }) => {
  await page.goto('/version');
  await expect(page.locator('button:has-text("Copy version")')).toBeVisible();
});

test('has version button showing version string', async ({ page }) => {
  await page.goto('/version');
  const versionButton = page.locator('button.btn-neutral').first();
  await expect(versionButton).toBeVisible();
  const text = await versionButton.textContent();
  expect(text).toMatch(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/);
});

test('can copy version string', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
    origin: 'http://localhost:3000',
  });
  await page.goto('/version');
  await page.locator('button:has-text("Copy version")').click();
  await expect(page.locator('button:has-text("Copied")')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/version');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'version.png'),
  });
});
