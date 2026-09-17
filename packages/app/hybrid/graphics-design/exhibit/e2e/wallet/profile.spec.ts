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

test.describe('Profile page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/wallet/profile');
    await waitForData(page);
  });

  test('renders the profile form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
    await expect(page.getByLabel('Full name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('prefills the seeded account details', async ({ page }) => {
    await expect(page.getByLabel('Full name')).toHaveValue('Alex Johnson');
    await expect(page.getByLabel('Email')).toHaveValue('alex@example.com');
  });

  test('confirms a save', async ({ page }) => {
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Changes saved.')).toBeVisible();
  });

  test('offers a sign out control that ends the wallet session', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /Sign out/i }).click();
    await expect(page).toHaveURL(/\/sign-in\/?$/);
    expect(
      await page.evaluate(() => localStorage.getItem('wallet-auth'))
    ).toBeNull();
  });
});
