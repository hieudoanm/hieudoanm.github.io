import { test, expect } from '@playwright/test';
import { WALLET_ROOT } from './helpers';

test.describe('Wallet open access', () => {
  test('wallet root loads without signing in', async ({ page }) => {
    await page.goto(WALLET_ROOT);
    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/?$`));
    await expect(
      page.getByRole('link', { name: /Wallet/i }).first()
    ).toBeVisible();
  });

  test('nested wallet routes load without signing in', async ({ page }) => {
    await page.goto(`${WALLET_ROOT}/cards`);
    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/cards/?$`));
  });

  test('signing in is still available through the shared page', async ({
    page,
  }) => {
    await page.goto(`/sign-in?next=${WALLET_ROOT}`);
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('Enter your password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/?$`));
  });
});
