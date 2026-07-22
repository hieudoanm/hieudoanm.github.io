import { test, expect } from '@playwright/test';

test.describe('Transactions page', () => {
  test('loads with all transactions', async ({ page }) => {
    await page.goto('/transactions');
    await expect(
      page.getByRole('heading', { name: 'Transactions' })
    ).toBeVisible();
    await expect(page.getByText('Grocery Store')).toBeVisible();
    await expect(page.getByText('Salary Deposit')).toBeVisible();
    await expect(page.getByText('Electric Bill')).toBeVisible();
    await expect(page.getByText('Amazon Purchase')).toBeVisible();
  });

  test('search filters by title', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByPlaceholder('Search transactions...').fill('Coffee');
    await expect(page.getByText('Coffee Shop')).toBeVisible();
    await expect(page.getByText('Grocery Store')).not.toBeVisible();
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByPlaceholder('Search transactions...').fill('coffee');
    await expect(page.getByText('Coffee Shop')).toBeVisible();
  });

  test('filter income shows only income transactions', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByRole('button', { name: 'Income' }).click();
    await expect(page.getByText('Salary Deposit')).toBeVisible();
    await expect(page.getByText('Freelance Payment')).toBeVisible();
    await expect(page.getByText('Grocery Store')).not.toBeVisible();
  });

  test('filter expense shows only expense transactions', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByRole('button', { name: 'Expense' }).click();
    await expect(page.getByText('Grocery Store')).toBeVisible();
    await expect(page.getByText('Electric Bill')).toBeVisible();
    await expect(page.getByText('Salary Deposit')).not.toBeVisible();
  });

  test('empty state shows when no matches', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByPlaceholder('Search transactions...').fill('zzzzz');
    await expect(page.getByText('No transactions found')).toBeVisible();
  });
});
