import { test, expect } from '@playwright/test';

test.describe('Transfer page', () => {
  test('renders transfer form', async ({ page }) => {
    await page.goto('/transfer');
    await expect(page.getByRole('heading', { name: 'Transfer' })).toBeVisible();
    await expect(page.getByText('From Account')).toBeVisible();
    await expect(
      page.getByPlaceholder('Recipient name or account')
    ).toBeVisible();
    await expect(page.getByPlaceholder('0.00')).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue/ })).toBeVisible();
  });

  test('submitting form shows confirmation screen', async ({ page }) => {
    await page.goto('/transfer');
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByText('Confirm Transfer')).toBeVisible();
    await expect(page.getByText('John', { exact: true })).toBeVisible();
    await expect(page.getByText('$100.00')).toBeVisible();
  });

  test('cancel returns to form', async ({ page }) => {
    await page.goto('/transfer');
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByText('Confirm Transfer')).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: 'Transfer' })).toBeVisible();
    await expect(
      page.getByPlaceholder('Recipient name or account')
    ).toBeVisible();
  });

  test('confirm triggers alert and resets form', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Transfer successful!');
      await dialog.accept();
    });

    await page.goto('/transfer');
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByRole('heading', { name: 'Transfer' })).toBeVisible();
    await expect(
      page.getByPlaceholder('Recipient name or account')
    ).toHaveValue('');
  });

  test('confirmation shows note when provided', async ({ page }) => {
    await page.goto('/transfer');
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByPlaceholder("What's this for?").fill('Lunch');
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByText('Lunch')).toBeVisible();
  });
});
