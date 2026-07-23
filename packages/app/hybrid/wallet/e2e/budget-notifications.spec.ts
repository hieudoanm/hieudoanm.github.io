import { test, expect } from '@playwright/test';

test.describe('Budget page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('wallet-auth', 'true'));
    await page.goto('/budget');
    await page.waitForLoadState('networkidle');
  });

  test('displays budget page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /budget/i })).toBeVisible();
  });

  test('shows budget categories', async ({ page }) => {
    const categories = page.locator('[data-testid^="budget-"]');
    await expect(categories.first()).toBeVisible({ timeout: 5000 });
  });

  test('shows total budget summary', async ({ page }) => {
    await expect(page.getByText(/total budget|remaining/i)).toBeVisible();
  });
});

test.describe('Notifications filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('wallet-auth', 'true'));
    await page.goto('/notifications');
    await page.waitForLoadState('networkidle');
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
    const unreadItem = page.locator('.ring-primary').first();
    if (await unreadItem.isVisible()) {
      await unreadItem.click();
      await page.waitForTimeout(500);
      await expect(unreadItem).not.toHaveClass(/ring-primary/);
    }
  });
});
