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

test.describe('Chat Header', () => {
  test('displays back button', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(
      page.locator('header button.btn-circle').first()
    ).toBeVisible();
  });

  test('displays conversation menu button', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(page.locator('.dropdown-content')).not.toBeVisible();
  });

  test('opens dropdown menu on click', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const moreButton = page.locator('header button.btn-ghost.btn-circle');
    await moreButton.click();
    await expect(page.locator('.dropdown-content')).toBeVisible();
  });

  test('dropdown menu shows Rename option', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await page.locator('header button.btn-ghost.btn-circle').click();
    await expect(page.locator('text=Rename')).toBeVisible();
  });

  test('dropdown menu shows Export Markdown option', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await page.locator('header button.btn-ghost.btn-circle').click();
    await expect(page.locator('text=Export Markdown')).toBeVisible();
  });

  test('dropdown menu shows Export JSON option', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await page.locator('header button.btn-ghost.btn-circle').click();
    await expect(page.locator('text=Export JSON')).toBeVisible();
  });

  test('dropdown menu shows Delete option', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await page.locator('header button.btn-ghost.btn-circle').click();
    await expect(
      page.locator('.dropdown-content >> text=Delete')
    ).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(page).toHaveURL(/\/chat\/?\?id=/);
    await page.locator('header button.btn-circle').first().click();
    await expect(page).toHaveURL('/');
  });

  test('rename conversation via menu', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await page.locator('header button.btn-ghost.btn-circle').click();
    await page.locator('text=Rename').click();
    const titleInput = page.locator('header input.input-sm');
    await expect(titleInput).toBeVisible();
    await titleInput.clear();
    await titleInput.fill('My Renamed Chat');
    await titleInput.press('Enter');
    await expect(page.locator('h1:has-text("My Renamed Chat")')).toBeVisible();
  });

  test('rename conversation via double-click on title', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const title = page.locator('header h1.truncate');
    await title.dblclick();
    const titleInput = page.locator('header input.input-sm');
    await expect(titleInput).toBeVisible();
  });
});
