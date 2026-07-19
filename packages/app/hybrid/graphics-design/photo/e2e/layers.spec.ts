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

test('loads layers page', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await expect(page.locator('h1:has-text("Layers")')).toBeVisible();
});

test('has back button', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await expect(page.locator('button.btn-circle').first()).toBeVisible();
});

test('has Add button', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await expect(page.locator('button:has-text("Add")')).toBeVisible();
});

test('can add a layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('text=Layer added')).toBeVisible();
});

test('displays empty state when no layers', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await expect(
    page.locator('text=No layers. Click Add to create one.')
  ).toBeVisible();
});

test('has visibility toggle after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('button.btn-circle').nth(1)).toBeVisible();
});

test('has lock toggle after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('button.btn-circle').nth(2)).toBeVisible();
});

test('has delete button after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('button.text-error').first()).toBeVisible();
});

test('has opacity slider after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('input[type="range"]').first()).toBeVisible();
});

test('has blend mode dropdown after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('select').first()).toBeVisible();
});

test('has editable layer names after adding layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await expect(page.locator('input[type="text"]').first()).toBeVisible();
});

test('can toggle visibility', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await page.locator('button.btn-circle').nth(1).click();
});

test('can toggle lock', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await page.locator('button.btn-circle').nth(2).click();
});

test('can delete a layer', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await page.locator('button.text-error').first().click();
});

test('can change blend mode', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  await page.locator('select').first().selectOption('multiply');
});

test('can edit layer name', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button:has-text("Add")').click();
  const input = page.locator('input[type="text"]').first();
  await input.clear();
  await input.fill('Renamed Layer');
});

test('back navigates to edit', async ({ page }) => {
  await page.goto('/edit/layers?id=img-1');
  await page.locator('button.btn-circle').first().click();
  await expect(page).toHaveURL(/\/edit.*id=img-1/);
});
