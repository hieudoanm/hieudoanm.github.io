import { test, expect } from '@playwright/test';
import { login } from './helpers';

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
  test('signing out redirects to login', async ({ page }) => {
    await login(page);
    await page.goto('/profile');

    const spinner = page.locator('.loading-spinner');
    if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
      await spinner.waitFor({ state: 'hidden', timeout: 15000 });
    }

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('after sign out, protected pages redirect to login', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/profile');

    const spinner = page.locator('.loading-spinner');
    if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
      await spinner.waitFor({ state: 'hidden', timeout: 15000 });
    }

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });
});
