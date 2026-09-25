import { Page } from '@playwright/test';

export const WALLET_ROOT = '/wallet';

/** Wallet is gated by a session that Exhibit's shared `/sign-in` sets. */
export const login = async (page: Page) => {
  await page.goto(`/sign-in?next=${WALLET_ROOT}`);
  await page.getByPlaceholder('you@example.com').fill('test@example.com');
  await page.getByPlaceholder('Enter your password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL((url) => url.pathname.startsWith(WALLET_ROOT));
};

export const logout = async (page: Page) => {
  await page.goto(`${WALLET_ROOT}/profile`);
  await page.getByRole('button', { name: /Sign out/i }).click();
  await page.waitForURL((url) => url.pathname.startsWith('/sign-in'));
};

export const waitForData = async (page: Page) => {
  const spinner = page.locator('.loading-spinner');
  if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
    await spinner.waitFor({ state: 'hidden', timeout: 15000 });
  }
};
