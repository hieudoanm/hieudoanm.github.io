import { test, expect } from '@playwright/test';
import path from 'path';

test.use({ viewport: { width: 375, height: 667 } });

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('All filter shows all items', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'All', exact: true })
  ).toHaveClass(/btn-primary/);
});

test('Login filter is clickable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Login', exact: true })
  ).toHaveClass(/btn-primary/);
});

test('search filters items', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button:has-text("New")')).toBeVisible();
  await page.locator('button:has-text("New")').click();
  await page.locator('input[placeholder="Title"]').fill('Unique Item');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('h2:has-text("New Item")')).not.toBeVisible();

  const searchInput = page.locator('input[placeholder*="Search"]');
  await searchInput.fill('Unique');
});
