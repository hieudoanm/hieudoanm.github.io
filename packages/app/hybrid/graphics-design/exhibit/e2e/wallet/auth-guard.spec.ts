import { test, expect } from '@playwright/test';
import { login, logout, WALLET_ROOT } from './helpers';

test.describe('Wallet route guard', () => {
  test('unauthenticated visitor is sent to sign in with a redirect target', async ({
    page,
  }) => {
    await page.goto(WALLET_ROOT);
    await expect(page).toHaveURL(/\/sign-in\/?\?next=%2Fwallet%2F?$/);
  });

  test('nested wallet routes are guarded too', async ({ page }) => {
    await page.goto(`${WALLET_ROOT}/cards`);
    await expect(page).toHaveURL(/\/sign-in\/?\?next=%2Fwallet%2Fcards%2F?$/);
  });

  test('signing in through the shared page opens the wallet app', async ({
    page,
  }) => {
    await page.goto(`/sign-in?next=${WALLET_ROOT}`);
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('Enter your password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/?$`));
    await expect(
      page.getByRole('link', { name: /Wallet/i }).first()
    ).toBeVisible();
  });

  test('sign in honours the guard redirect target', async ({ page }) => {
    await page.goto(`${WALLET_ROOT}/cards`);
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('Enter your password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/cards/?$`));
  });

  test('signing out clears the session and re-guards the app', async ({
    page,
  }) => {
    await login(page);
    await logout(page);

    const session = await page.evaluate(() =>
      localStorage.getItem('wallet-auth')
    );
    expect(session).toBeNull();

    await page.goto(WALLET_ROOT);
    await expect(page).toHaveURL(/\/sign-in\/?(\?|$)/);
  });

  test('sign up also establishes a wallet session', async ({ page }) => {
    await page.goto('/sign-up');
    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.locator('#signup-password').fill('password123');
    await page.locator('#confirm').fill('password123');
    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page).toHaveURL(new RegExp(`${WALLET_ROOT}/?$`));
  });
});
