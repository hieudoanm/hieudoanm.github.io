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

test('loads downloads page', async ({ page }) => {
  await page.goto('/downloads');
  await expect(page.locator('h1:has-text("Installers")')).toBeVisible();
});

test('displays downloads heading', async ({ page }) => {
  await page.goto('/downloads');
  await expect(page.locator('p.text-xs:has-text("Downloads")')).toBeVisible();
});

test('displays description', async ({ page }) => {
  await page.goto('/downloads');
  await expect(
    page.locator('text=Pick the package for your platform')
  ).toBeVisible();
});

test('displays version', async ({ page }) => {
  await page.goto('/downloads');
  await expect(page.locator('text=v0.0.1')).toBeVisible();
});

test('displays Stable badge', async ({ page }) => {
  await page.goto('/downloads');
  await expect(page.locator('.badge:has-text("Stable")')).toBeVisible();
});

test('shows Linux download', async ({ page }) => {
  await page.goto('/downloads');
  await expect(
    page.locator('span.font-bold:has-text("Linux")').first()
  ).toBeVisible();
  await expect(
    page.locator('a[aria-label="Download .AppImage"]')
  ).toBeVisible();
});

test('shows Linux Debian download', async ({ page }) => {
  await page.goto('/downloads');
  await expect(page.locator('text=Linux (Debian)')).toBeVisible();
  await expect(page.locator('a[aria-label="Download .deb"]')).toBeVisible();
});

test('shows macOS download', async ({ page }) => {
  await page.goto('/downloads');
  await expect(
    page.locator('span.font-bold:has-text("macOS")').first()
  ).toBeVisible();
  await expect(page.locator('a[aria-label="Download .dmg"]')).toBeVisible();
});

test('shows Windows download', async ({ page }) => {
  await page.goto('/downloads');
  await expect(
    page.locator('span.font-bold:has-text("Windows")').first()
  ).toBeVisible();
  await expect(page.locator('a[aria-label="Download .msi"]')).toBeVisible();
});

test('download links point to releases', async ({ page }) => {
  await page.goto('/downloads');
  const links = page.locator('a[aria-label^="Download"]');
  await expect(links).toHaveCount(4);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute(
      'href',
      /releases\/download\/app-hybrid-graphics-design-colors-latest/
    );
  }
});

test('download links have aria-labels', async ({ page }) => {
  await page.goto('/downloads');
  await expect(
    page.locator('a[aria-label="Download .AppImage"]')
  ).toBeVisible();
  await expect(page.locator('a[aria-label="Download .deb"]')).toBeVisible();
  await expect(page.locator('a[aria-label="Download .dmg"]')).toBeVisible();
  await expect(page.locator('a[aria-label="Download .msi"]')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/downloads');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'downloads.png'),
  });
});
