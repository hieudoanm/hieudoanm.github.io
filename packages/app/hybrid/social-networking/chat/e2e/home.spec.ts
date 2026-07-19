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

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Chat/);
  });

  test('displays chat heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1:has-text("Chat")')).toBeVisible();
  });

  test('displays subtitle text', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('text=Select a conversation or start a new one')
    ).toBeVisible();
  });

  test('has new chat button in sidebar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("New Chat")')).toBeVisible();
  });

  test('has search input in sidebar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('sidebar shows Active and Archived toggle', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("Active")')).toBeVisible();
    await expect(page.locator('button:has-text("Archived")')).toBeVisible();
  });

  test('sidebar shows Folders section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Folders')).toBeVisible();
  });

  test('has folder creation input and add button', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('input[placeholder="New folder..."]')
    ).toBeVisible();
    await expect(page.locator('button:has-text("Add")')).toBeVisible();
  });

  test('add folder button is disabled when input is empty', async ({
    page,
  }) => {
    await page.goto('/');
    const addButton = page.locator('button:has-text("Add")');
    await expect(addButton).toBeDisabled();
  });
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
