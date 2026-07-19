import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.describe('Pay page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/pay');
  });

  test('renders QR actions and quick pay form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Pay', exact: true })
    ).toBeVisible();
    await expect(page.getByText('Show QR Code')).toBeVisible();
    await expect(page.getByText('Scan QR Code')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Quick Pay' })
    ).toBeVisible();
  });

  test('show QR opens modal', async ({ page }) => {
    await page.getByText('Show QR Code').click();
    await expect(page.getByText('Your QR Code')).toBeVisible();
    await expect(page.getByText('Scan this code to pay')).toBeVisible();
  });

  test('QR modal closes', async ({ page }) => {
    await page.getByText('Show QR Code').click();
    await expect(page.getByText('Your QR Code')).toBeVisible();

    await page.getByRole('button', { name: 'Close QR code modal' }).click();
    await expect(page.getByText('Your QR Code')).not.toBeVisible();
  });

  test('quick pay submits and shows toast', async ({ page }) => {
    await page.getByPlaceholder('0.00').fill('50');
    await page.getByRole('button', { name: /Send Payment/ }).click();
    await expect(page.getByText('Payment sent!')).toBeVisible();
  });
});
