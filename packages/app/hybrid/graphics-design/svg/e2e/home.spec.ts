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
  await expect(page).toHaveTitle(/SVG/);
});

test('displays library heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1:has-text("SVG Library")')).toBeVisible();
});

test('has New Document button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New Document")')).toBeVisible();
});

test('has Templates button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("Templates")')).toBeVisible();
});

test('displays existing documents', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Logo Design')).toBeVisible();
});

test('New Document opens creation modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await expect(page.locator('h3:has-text("New Document")')).toBeVisible();
  await expect(page.locator('input[placeholder="My SVG"]')).toBeVisible();
});

test('creation modal has width and height inputs', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await expect(page.locator('input[type="number"]').first()).toBeVisible();
});

test('creation modal has cancel button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('creation modal has create button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await expect(page.locator('button:has-text("Create")')).toBeVisible();
});

test('can create a new document', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await page.locator('input[placeholder="My SVG"]').fill('Test SVG');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Test SVG')).toBeVisible();
});

test('can cancel document creation', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Document")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('h3:has-text("New Document")')).not.toBeVisible();
});

test('Templates opens template modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("Templates")').click();
  await expect(page.locator('text=Choose Template')).toBeVisible();
});

test('template modal has template cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("Templates")').click();
  await expect(page.locator('text=Blank')).toBeVisible();
  await expect(page.locator('text=Icon Set')).toBeVisible();
  await expect(page.locator('text=Illustration')).toBeVisible();
  await expect(page.locator('h4:has-text("Logo")')).toBeVisible();
});

test('template modal has cancel button', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("Templates")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('can close template modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("Templates")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('text=Choose Template')).not.toBeVisible();
});

test('document cards show dimensions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.card p').first()).toContainText('x');
});

test('document cards show shape count', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.card').first()).toContainText(/shapes?/);
});

test('clicking document navigates to editor', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page).toHaveURL(/\/edit\/?\?id=/);
});

test('has rename button on documents', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('.card').first().locator('.card-body button').first()
  ).toBeVisible();
});

test('has delete button on documents', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('.card').first().locator('.text-error')
  ).toBeVisible();
});
