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
    await page.goto('/profile');
    await waitForData(page);
  });

  test('renders user info', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Alex Johnson' })
    ).toBeVisible();
    await expect(page.getByText('alex@example.com').first()).toBeVisible();
  });

  test('has settings link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Settings/ }).first()
    ).toBeVisible();
  });

  test('has personal information form', async ({ page }) => {
    await expect(page.getByText('Personal Information')).toBeVisible();
    await expect(page.getByText('Phone Number')).toBeVisible();
    await expect(page.getByText('Email Address')).toBeVisible();
  });

  test('sign out button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  });
});
