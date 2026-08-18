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

test.describe('Route guard', () => {
  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole('heading', { name: 'Welcome Back' })
    ).toBeVisible();
  });

  test('authenticated user is redirected away from login', async ({ page }) => {
    await login(page);
    await page.goto('/login');
    await expect(page).toHaveURL('/');
  });

  test('authenticated user is redirected away from register', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/register');
    await expect(page).toHaveURL('/');
  });

  test('protected pages are inaccessible when unauthenticated', async ({
    page,
  }) => {
    const protectedRoutes = [
      '/accounts',
      '/transactions',
      '/transfer',
      '/cards',
      '/budget',
      '/pay',
      '/bills',
      '/exchange',
      '/notifications',
      '/profile',
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/login/);
    }
  });
});

test.describe('Sign out flow', () => {
  test('signing out clears auth and user is no longer authenticated', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/profile');
    await page
      .getByRole('button', { name: 'Sign Out' })
      .waitFor({ timeout: 15000 });

    await page.getByRole('button', { name: 'Sign Out' }).click();

    const authValue = await page.evaluate(() =>
      localStorage.getItem('wallet-auth')
    );
    expect(authValue).toBeNull();
  });

  test('after sign out, protected pages redirect to login', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/profile');
    await page
      .getByRole('button', { name: 'Sign Out' })
      .waitFor({ timeout: 15000 });

    await page.getByRole('button', { name: 'Sign Out' }).click();

    const authValue = await page.evaluate(() =>
      localStorage.getItem('wallet-auth')
    );
    expect(authValue).toBeNull();

    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });
});
