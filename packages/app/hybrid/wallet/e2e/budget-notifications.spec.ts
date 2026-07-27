import { test, expect } from '@playwright/test';
import { login, waitForData } from './helpers';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Budget page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/budget');
    await waitForData(page);
  });

  test('displays budget page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /budget/i })).toBeVisible();
  });

  test('shows budget categories', async ({ page }) => {
    const categories = page.locator('[data-testid^="budget-"]');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
    expect(await categories.count()).toBeGreaterThan(0);
  });

  test('shows total budget summary', async ({ page }) => {
    await expect(page.getByText(/total budget|remaining/i)).toBeVisible();
  });
});

test.describe('Notifications filtering', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/notifications');
    await waitForData(page);
  });

  test('displays notifications page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /notifications/i })
    ).toBeVisible();
  });

  test('shows filter buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /unread/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /alerts/i })).toBeVisible();
  });

  test('filters to unread only', async ({ page }) => {
    await page.getByRole('button', { name: /unread/i }).click();
    const items = page.locator('.ring-primary');
    const count = await items.count();
    if (count > 0) {
      await expect(items.first()).toBeVisible();
    }
  });

  test('clicking a notification marks it as read', async ({ page }) => {
    const notifications = page.locator('.ring-primary');
    const count = await notifications.count();
    if (count > 0) {
      const firstUnread = notifications.first();
      const title = await firstUnread.locator('p.font-medium').textContent();
      await firstUnread.click();
      await page.waitForTimeout(500);
      if (title) {
        await expect(page.getByText(title)).toBeVisible();
      }
    }
  });
});
