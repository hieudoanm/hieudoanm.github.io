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

test('loads edit page with image', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('text=Mountain Sunrise')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('has tool buttons', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button[title="Move"]')).toBeVisible();
  await expect(page.locator('button[title="Crop"]')).toBeVisible();
  await expect(page.locator('button[title="Brush"]')).toBeVisible();
  await expect(page.locator('button[title="Text"]')).toBeVisible();
  await expect(page.locator('button[title="Shape"]')).toBeVisible();
});

test('has Before toggle button', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button:has-text("Before")')).toBeVisible();
});

test('has favorite toggle', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('header button.btn-circle').nth(1)).toBeVisible();
});

test('has Reset button', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button:has-text("Reset")')).toBeVisible();
});

test('has zoom controls', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('text=100%')).toBeVisible();
  await expect(page.locator('input[type="range"]').last()).toBeVisible();
});

test('can switch tools', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button[title="Crop"]').click();
  await page.locator('button[title="Brush"]').click();
  await page.locator('button[title="Text"]').click();
  await page.locator('button[title="Shape"]').click();
  await page.locator('button[title="Move"]').click();
});

test('has Adjust tab', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button:has-text("adjust")')).toBeVisible();
});

test('has Filter tab', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button:has-text("filter")')).toBeVisible();
});

test('has Layer tab', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await expect(page.locator('button:has-text("layer")')).toBeVisible();
});

test('adjust tab shows sliders', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("adjust")').click();
  await expect(page.locator('text=Brightness')).toBeVisible();
  await expect(page.locator('text=Contrast')).toBeVisible();
  await expect(page.locator('text=Saturation')).toBeVisible();
  await expect(page.locator('text=Hue')).toBeVisible();
});

test('filter tab shows filter grid', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("filter")').click();
  await expect(page.locator('text=Original')).toBeVisible();
  await expect(page.locator('text=Warm')).toBeVisible();
  await expect(page.locator('text=Cool')).toBeVisible();
  await expect(page.locator('text=B&W')).toBeVisible();
});

test('filter tab shows intensity slider', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("filter")').click();
  await expect(page.locator('text=/Intensity/')).toBeVisible();
});

test('layer tab shows add button', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("layer")').click();
  await expect(page.locator('button:has-text("Add Layer")')).toBeVisible();
});

test('layer tab shows empty state', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("layer")').click();
  await expect(page.locator('text=No layers yet')).toBeVisible();
});

test('can adjust brightness slider', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("adjust")').click();
  const slider = page.locator('input[type="range"]').first();
  await slider.fill('50');
});

test('can select a filter', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("filter")').click();
  await page.locator('button:has-text("Warm")').click();
});

test('back navigates to home', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL('/');
});

test('can select different filters', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("filter")').click();
  const filters = ['Original', 'Warm', 'Cool', 'B&W', 'Vintage'];
  for (const filter of filters) {
    await page.locator(`button:has-text("${filter}")`).click();
  }
});

test('can add and manage layers', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("layer")').click();
  await page.locator('button:has-text("Add Layer")').click();
  await expect(page.locator('text=Layer 1')).toBeVisible();
});

test('can toggle layer visibility', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("layer")').click();
  await page.locator('button:has-text("Add Layer")').click();
  await page.locator('button.btn-ghost.btn-circle').first().click();
});

test('can delete a layer', async ({ page }) => {
  await page.goto('/edit?id=img-1');
  await page.locator('button:has-text("layer")').click();
  await page.locator('button:has-text("Add Layer")').click();
  await page.locator('button.text-error.btn-circle').first().click();
});
