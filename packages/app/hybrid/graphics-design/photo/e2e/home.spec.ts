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
  await expect(page).toHaveTitle(/Photo/);
});

test('displays library heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1:has-text("Photo Library")')).toBeVisible();
});

test('has Upload button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("Upload")')).toBeVisible();
});

test('has search input', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
});

test('has Albums link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a:has-text("Albums")')).toBeVisible();
});

test('has sort dropdown', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('select')).toBeVisible();
});

test('has view toggle button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('displays grid of images', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href*="/edit"]')).toHaveCount(10);
});

test('displays multiple image cards', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('a[href*="/edit"]');
  await expect(cards).toHaveCount(10);
});

test('has favorite toggle on images', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('a[href*="/edit"]').first();
  await card.hover();
  await expect(card.locator('button.btn-circle').first()).toBeVisible();
});

test('can toggle favorite on image', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('a[href*="/edit"]').first();
  await card.hover();
  await card.locator('button.btn-circle').first().click();
});

test('can toggle view mode', async ({ page }) => {
  await page.goto('/');
  await page.locator('button.btn-circle').first().click();
  await page.locator('button.btn-circle').first().click();
});

test('can sort by name', async ({ page }) => {
  await page.goto('/');
  await page.locator('select').selectOption('name');
});

test('search filters images', async ({ page }) => {
  await page.goto('/');
  await page.locator('input[placeholder*="Search"]').fill('Mountain');
  await page.locator('input[placeholder*="Search"]').press('Enter');
});

test('search with empty input shows all images', async ({ page }) => {
  await page.goto('/');
  await page.locator('input[placeholder*="Search"]').fill('');
  await expect(page.locator('a[href*="/edit"]')).toHaveCount(10);
});

test('opens upload modal on click', async ({ page }) => {
  await page.goto('/');
  await page.locator('header button:has-text("Upload")').click();
  await expect(page.locator('text=Upload Image')).toBeVisible();
  await expect(
    page.locator('text=Drag & drop or click to upload')
  ).toBeVisible();
});

test('upload modal has cancel button', async ({ page }) => {
  await page.goto('/');
  await page.locator('header button:has-text("Upload")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('upload modal has upload button', async ({ page }) => {
  await page.goto('/');
  await page.locator('header button:has-text("Upload")').click();
  await expect(
    page.locator('.card-actions button:has-text("Upload")')
  ).toBeVisible();
});

test('can close upload modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('header button:has-text("Upload")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('text=Upload Image')).not.toBeVisible();
});

test('New button opens new album modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('text=New Album')).toBeVisible();
});

test('new album modal has input field', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('input[placeholder*="Album name"]')).toBeVisible();
});

test('can create a new album', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await page.locator('input[placeholder*="Album name"]').fill('My Test Album');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=My Test Album')).toBeVisible();
});

test('can cancel new album creation', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('text=New Album')).not.toBeVisible();
});

test('can create album from home page', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New")').click();
  await page.locator('input[placeholder*="Album name"]').fill('Temp Album');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Temp Album')).toBeVisible();
});

test('clicking image navigates to edit page', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('a[href*="/edit"]').first();
  await link.click();
  await expect(page).toHaveURL(/\/edit.*id=/);
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
