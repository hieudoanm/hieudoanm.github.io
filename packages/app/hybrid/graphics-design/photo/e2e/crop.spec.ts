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

test('loads crop page', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('h1:has-text("Crop & Transform")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('has Apply button', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('button:has-text("Apply")')).toBeVisible();
});

test('has aspect ratio buttons', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('button:has-text("Free")')).toBeVisible();
  await expect(page.locator('button:has-text("1:1")')).toBeVisible();
  await expect(page.locator('button:has-text("4:3")')).toBeVisible();
  await expect(page.locator('button:has-text("16:9")')).toBeVisible();
});

test('can select aspect ratio', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await page.locator('button:has-text("4:3")').click();
});

test('has rotate buttons', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('button:has-text("-90")')).toBeVisible();
  await expect(page.locator('button:has-text("+90")')).toBeVisible();
});

test('has rotation slider', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('text=/Rotation/')).toBeVisible();
});

test('has flip buttons', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await expect(page.locator('button:has-text("Horizontal")')).toBeVisible();
  await expect(page.locator('button:has-text("Vertical")')).toBeVisible();
});

test('can flip horizontal', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await page.locator('button:has-text("Horizontal")').click();
});

test('can flip vertical', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await page.locator('button:has-text("Vertical")').click();
});

test('back navigates to edit', async ({ page }) => {
  await page.goto('/edit/crop?id=img-1');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL(/\/edit.*id=img-1/);
});
