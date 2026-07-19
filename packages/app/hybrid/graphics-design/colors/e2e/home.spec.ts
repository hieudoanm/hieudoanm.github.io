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

test('loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Colors/);
});

test('displays heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1:has-text("Colors")')).toBeVisible();
});

test('displays description', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('text=A collection of practical tools')
  ).toBeVisible();
});

test('renders all 16 tool cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid^="tool-card-"]')).toHaveCount(16);
});

test('tool cards have correct data-testid values', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('[data-testid="tool-card-converter"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="tool-card-adjuster"]')
  ).toBeVisible();
  await expect(page.locator('[data-testid="tool-card-wheel"]')).toBeVisible();
  await expect(page.locator('[data-testid="tool-card-schemes"]')).toBeVisible();
  await expect(
    page.locator('[data-testid="tool-card-contrast"]')
  ).toBeVisible();
});

test('tool cards link to correct pages', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-converter"]').click();
  await expect(page).toHaveURL(/\/converter/);
});

test('can navigate to adjuster from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-adjuster"]').click();
  await expect(page).toHaveURL(/\/adjuster/);
});

test('can navigate to wheel from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-wheel"]').click();
  await expect(page).toHaveURL(/\/wheel/);
});

test('can navigate to schemes from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-schemes"]').click();
  await expect(page).toHaveURL(/\/schemes/);
});

test('can navigate to contrast from home', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="tool-card-contrast"]').click();
  await expect(page).toHaveURL(/\/contrast/);
});

test('tool cards display labels', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Color Converter')).toBeVisible();
  await expect(page.locator('text=Color Adjuster')).toBeVisible();
  await expect(page.locator('text=Color Wheel')).toBeVisible();
  await expect(page.locator('text=Color Schemes')).toBeVisible();
  await expect(page.locator('text=Contrast Checker')).toBeVisible();
});

test('tool cards display descriptions', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('text=Convert between HEX, RGB, HSL, HSV and CMYK')
  ).toBeVisible();
  await expect(
    page.locator('text=Tune hue, saturation and lightness')
  ).toBeVisible();
});

test('all tool links are anchor elements', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('[data-testid^="tool-card-"]');
  await expect(links).toHaveCount(16);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', /\/\w/);
  }
});

test('page renders without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await expect(page.locator('h1:has-text("Colors")')).toBeVisible();
  expect(errors).toHaveLength(0);
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
