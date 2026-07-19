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

test('loads editor page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page).toHaveURL(/\/edit\/?\?id=/);
});

test('has back button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('displays document title', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('h1').first()).toBeVisible();
});

test('has drawing tool buttons', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Select (V)"]')).toBeVisible();
  await expect(page.locator('button[title="Rectangle (R)"]')).toBeVisible();
  await expect(page.locator('button[title="Ellipse (E)"]')).toBeVisible();
  await expect(page.locator('button[title="Line (L)"]')).toBeVisible();
  await expect(page.locator('button[title="Pen (P)"]')).toBeVisible();
  await expect(page.locator('button[title="Pencil"]')).toBeVisible();
  await expect(page.locator('button[title="Text (T)"]')).toBeVisible();
});

test('has undo/redo buttons', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Undo (Ctrl+Z)"]')).toBeVisible();
  await expect(
    page.locator('button[title="Redo (Ctrl+Shift+Z)"]')
  ).toBeVisible();
});

test('has grid toggle', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Toggle Grid"]')).toBeVisible();
});

test('has snap toggle', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Snap to Grid"]')).toBeVisible();
});

test('has preview mode toggle', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Preview Mode"]')).toBeVisible();
});

test('has zoom controls', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('text=/\\d+%/').first()).toBeVisible();
});

test('has export button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="Export SVG"]')).toBeVisible();
});

test('has SVG Code button', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button[title="SVG Code"]')).toBeVisible();
});

test('has layers tab', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button:has-text("Layers")')).toBeVisible();
});

test('has properties tab', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button:has-text("Props")')).toBeVisible();
});

test('has symbols tab', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('button:has-text("Symbols")')).toBeVisible();
});

test('can switch drawing tools', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="Rectangle (R)"]').click();
  await page.locator('button[title="Ellipse (E)"]').click();
  await page.locator('button[title="Line (L)"]').click();
  await page.locator('button[title="Text (T)"]').click();
  await page.locator('button[title="Select (V)"]').click();
});

test('can toggle grid', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="Toggle Grid"]').click();
  await page.locator('button[title="Toggle Grid"]').click();
});

test('can toggle snap', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="Snap to Grid"]').click();
  await page.locator('button[title="Snap to Grid"]').click();
});

test('can toggle preview mode', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button[title="Preview Mode"]').click();
  await page.locator('button[title="Preview Mode"]').click();
});

test('layers tab shows existing layers', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.locator('span.truncate').first()).toBeVisible();
});

test('properties tab shows placeholder when nothing selected', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await expect(page.locator('h1').first()).toBeVisible();
  await page.locator('button:has-text("Props")').dispatchEvent('click');
  await expect(page.locator('text=Select a shape')).toBeVisible();
});

test('back navigates to home', async ({ page }) => {
  await page.goto('/');
  await page.locator('.card').first().click();
  await page.locator('button.btn-circle').first().click({ force: true });
  await expect(page).toHaveURL('/');
});
