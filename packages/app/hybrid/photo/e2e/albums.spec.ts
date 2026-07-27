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

test('loads albums page', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('h1:has-text("Albums")')).toBeVisible();
});

test('has back arrow', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('a[href="/"]')).toBeVisible();
});

test('has New album button', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('button:has-text("New")')).toBeVisible();
});

test('displays existing albums', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('text=All Photos')).toBeVisible();
  await expect(page.locator('text=Favorites')).toBeVisible();
  await expect(page.locator('text=Recent')).toBeVisible();
});

test('shows photo counts', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('text=/\\d+ photos/').first()).toBeVisible();
});

test('back navigates to home', async ({ page }) => {
  await page.goto('/albums');
  await page.locator('a[href="/"]').click();
  await expect(page).toHaveURL('/');
});

test('New opens create album modal', async ({ page }) => {
  await page.goto('/albums');
  await page.locator('button:has-text("New")').click();
  await expect(page.locator('text=New Album')).toBeVisible();
});

test('can create album from modal', async ({ page }) => {
  await page.goto('/albums');
  await page.locator('button:has-text("New")').click();
  await page.locator('input[placeholder*="Album name"]').fill('Test Album');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Album created')).toBeVisible();
});

test('can cancel album creation', async ({ page }) => {
  await page.goto('/albums');
  await page.locator('button:has-text("New")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('text=New Album')).not.toBeVisible();
});

test('has delete buttons on albums', async ({ page }) => {
  await page.goto('/albums');
  await expect(page.locator('button:has-text("Delete")').first()).toBeVisible();
});
