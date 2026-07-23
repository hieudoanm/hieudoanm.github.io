import { test, expect } from '@playwright/test';
import { login, waitForData } from './helpers';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('loads successfully', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Good morning, Alex')).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Wallet');
  });

  test('displays total balance', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('$44,830.88')).toBeVisible();
  });

  test('displays all account cards', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Main Checking')).toBeVisible();
    await expect(page.getByText('Savings', { exact: true })).toBeVisible();
    await expect(page.getByText('Credit Card')).toBeVisible();
  });

  test('shows recent transactions', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Grocery Store')).toBeVisible();
    await expect(page.getByText('Salary Deposit')).toBeVisible();
  });

  test('view all link navigates to transactions', async ({ page }) => {
    await waitForData(page);
    await page.getByRole('link', { name: 'View all' }).click();
    await expect(page).toHaveURL(/\/transactions/);
    await expect(page.getByText('Transaction history')).toBeVisible();
  });
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');
  await expect(page.getByText('404')).toBeVisible();
});
