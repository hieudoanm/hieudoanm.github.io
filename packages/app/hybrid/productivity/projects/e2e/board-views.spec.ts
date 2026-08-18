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

const goToBoard = async (page: import('@playwright/test').Page) => {
  await page.goto('/board?id=board-2');
  await expect(page.locator('h1')).toBeVisible();
};

test('loads list view', async ({ page }) => {
  await goToBoard(page);
  await page.locator('a:has-text("List")').click();
  await expect(page).toHaveURL(/\/board\/list/);
});

test('loads calendar view', async ({ page }) => {
  await goToBoard(page);
  await page.locator('a:has-text("Calendar")').click();
  await expect(page).toHaveURL(/\/board\/cal/);
});

test('loads timeline view', async ({ page }) => {
  await goToBoard(page);
  await page.locator('a:has-text("Timeline")').click();
  await expect(page).toHaveURL(/\/board\/timeline/);
});
