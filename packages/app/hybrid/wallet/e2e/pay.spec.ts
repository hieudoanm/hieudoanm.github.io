import { test, expect } from '@playwright/test';

test.describe('Pay page', () => {
  test('renders QR actions and quick pay form', async ({ page }) => {
    await page.goto('/pay');
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
    await page.goto('/pay');
    await page.getByText('Show QR Code').click();
    await expect(page.getByText('Your QR Code')).toBeVisible();
    await expect(page.getByText('Scan this code to pay')).toBeVisible();
  });

  test('QR modal closes', async ({ page }) => {
    await page.goto('/pay');
    await page.getByText('Show QR Code').click();
    await expect(page.getByText('Your QR Code')).toBeVisible();

    await page.getByRole('button', { name: 'Close QR code modal' }).click();
    await expect(page.getByText('Your QR Code')).not.toBeVisible();
  });

  test('quick pay submits and alerts', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Payment sent!');
      await dialog.accept();
    });

    await page.goto('/pay');
    await page.getByPlaceholder('0.00').fill('50');
    await page.getByRole('button', { name: /Send Payment/ }).click();
  });
});
