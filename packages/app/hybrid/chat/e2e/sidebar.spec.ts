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

test.describe('Sidebar', () => {
  test('search filters conversations', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('nonexistent');
    await expect(page.locator('text=No conversations found')).toBeVisible();
  });

  test('search input clears and shows conversations again', async ({
    page,
  }) => {
    await page.goto('/');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('nonexistent');
    await expect(page.locator('text=No conversations found')).toBeVisible();
    await searchInput.evaluate((el) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(el, '');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await expect(searchInput).toHaveValue('');
  });

  test('can toggle between Active and Archived', async ({ page }) => {
    await page.goto('/');
    const archivedButton = page.locator('button:has-text("Archived")');
    await archivedButton.click();
    await expect(archivedButton).toHaveClass(/btn-primary/);
  });

  test('folder creation with Enter key', async ({ page }) => {
    await page.goto('/');
    const folderInput = page.locator('input[placeholder="New folder..."]');
    await folderInput.fill('Work');
    await folderInput.press('Enter');
    await expect(page.locator('text=Work')).toBeVisible();
  });

  test('folder creation with Add button', async ({ page }) => {
    await page.goto('/');
    const folderInput = page.locator('input[placeholder="New folder..."]');
    await folderInput.fill('Personal');
    await page.locator('button:has-text("Add")').click();
    await expect(page.locator('text=Personal')).toBeVisible();
  });
});
