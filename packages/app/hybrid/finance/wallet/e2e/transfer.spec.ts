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

test.describe('Transfer page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/transfer');
    await waitForData(page);
  });

  test('renders transfer form step 1', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Transfer' })).toBeVisible();
    await expect(page.getByText('From Account')).toBeVisible();
    await expect(
      page.getByPlaceholder('Recipient name or account')
    ).toBeVisible();
    await expect(page.locator('.btn-primary:has-text("Next")')).toBeVisible();
  });

  test('submitting form shows confirmation screen', async ({ page }) => {
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.locator('.btn-primary:has-text("Next")').click();
    await expect(page.getByPlaceholder('0.00')).toBeVisible();
    await page.getByPlaceholder('0.00').fill('100');
    await page.locator('.btn-primary:has-text("Next")').click();
    await expect(page.getByText('From')).toBeVisible();
    await expect(page.getByText('John', { exact: true })).toBeVisible();
  });

  test('cancel returns to form', async ({ page }) => {
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.locator('.btn-primary:has-text("Next")').click();
    await page.getByPlaceholder('0.00').fill('100');
    await page.locator('.btn-primary:has-text("Next")').click();
    await expect(page.getByText('From')).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByPlaceholder('0.00')).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('heading', { name: 'Transfer' })).toBeVisible();
    await expect(
      page.getByPlaceholder('Recipient name or account')
    ).toBeVisible();
  });

  test('confirm shows toast and resets form', async ({ page }) => {
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.locator('.btn-primary:has-text("Next")').click();
    await page.getByPlaceholder('0.00').fill('100');
    await page.locator('.btn-primary:has-text("Next")').click();
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('Transfer successful!').first()).toBeVisible();
    await expect(page.getByText('Transfer Sent!')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'New Transfer' })
    ).toBeVisible();
  });

  test('confirmation shows note when provided', async ({ page }) => {
    await page.getByPlaceholder('Recipient name or account').fill('John');
    await page.locator('.btn-primary:has-text("Next")').click();
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByPlaceholder("What's this for?").fill('Lunch');
    await page.locator('.btn-primary:has-text("Next")').click();
    await expect(page.getByText('Lunch')).toBeVisible();
  });
});
