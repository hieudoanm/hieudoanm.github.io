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

test('search filters connections', async ({ page }) => {
  await page.goto('/');
  await page.locator('button:has-text("New Connection")').click();
  await page
    .locator('input[placeholder="Connection name"]')
    .fill('Production DB');
  await page.locator('input[placeholder*="File path"]').fill('/data/prod.db');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Development DB')).toBeVisible();

  await page.locator('button:has-text("New Connection")').click();
  await page
    .locator('input[placeholder="Connection name"]')
    .fill('Development DB');
  await page.locator('input[placeholder*="File path"]').fill('/data/dev.db');
  await page.locator('button:has-text("Create")').click();

  const searchInput = page.locator('input[placeholder*="Search"]');
  await searchInput.fill('Production');
  await expect(page.getByText('Production DB').first()).toBeVisible();
});
