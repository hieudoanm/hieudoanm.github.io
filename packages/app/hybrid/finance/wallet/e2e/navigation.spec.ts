import { test, expect } from '@playwright/test';
import { login } from './helpers';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Sidebar navigation (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('renders all navigation links', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Dashboard')).toBeVisible();
    await expect(sidebar.getByText('Accounts')).toBeVisible();
    await expect(sidebar.getByText('Transactions')).toBeVisible();
    await expect(sidebar.getByText('Transfer')).toBeVisible();
    await expect(sidebar.getByText('Cards')).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Budget' })).toBeVisible();
    await expect(
      sidebar.getByRole('link', { name: 'Pay', exact: true })
    ).toBeVisible();
    await expect(sidebar.getByText('Bills')).toBeVisible();
    await expect(sidebar.getByText('Exchange')).toBeVisible();
    await expect(sidebar.getByText('Notifications')).toBeVisible();
    await expect(sidebar.getByText('Profile')).toBeVisible();
  });

  test('sidebar links navigate to correct pages', async ({ page }) => {
    const sidebar = page.locator('aside');

    await sidebar.getByText('Accounts').click();
    await expect(page).toHaveURL(/\/accounts/);
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible();

    await sidebar.getByText('Budget', { exact: true }).click();
    await expect(page).toHaveURL(/\/budget/);
    await expect(page.getByRole('heading', { name: 'Budget' })).toBeVisible();

    await sidebar.getByText('Cards').click();
    await expect(page).toHaveURL(/\/cards/);
    await expect(
      page.getByRole('heading', { name: 'Cards', exact: true })
    ).toBeVisible();
  });

  test('sidebar highlights active link', async ({ page }) => {
    await page.goto('/accounts');
    const sidebar = page.locator('aside');
    const accountsLink = sidebar.getByText('Accounts').first();
    await expect(accountsLink).toHaveAttribute('aria-current', 'page');
  });

  test('sidebar displays user info', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Alex Johnson')).toBeVisible();
    await expect(sidebar.getByText('alex@example.com')).toBeVisible();
  });
});

test.describe('Bottom navigation (mobile)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('renders bottom nav items', async ({ page }) => {
    const bottomNav = page.getByLabel('Bottom navigation');
    await expect(bottomNav.getByText('Home')).toBeVisible();
    await expect(bottomNav.getByText('Accounts')).toBeVisible();
    await expect(bottomNav.getByText('Pay')).toBeVisible();
    await expect(bottomNav.getByText('Cards')).toBeVisible();
    await expect(bottomNav.getByText('More')).toBeVisible();
  });

  test('bottom nav links navigate correctly', async ({ page }) => {
    const bottomNav = page.getByLabel('Bottom navigation');

    await bottomNav.getByText('Pay').click();
    await expect(page).toHaveURL(/\/pay/);

    await bottomNav.getByText('Cards').click();
    await expect(page).toHaveURL(/\/cards/);
  });

  test('bottom nav highlights active link', async ({ page }) => {
    await page.goto('/pay');
    const bottomNav = page.getByLabel('Bottom navigation');
    const payLink = bottomNav.getByRole('link', { name: 'Pay' });
    await expect(payLink).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('Header (mobile)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('hamburger opens and closes menu', async ({ page }) => {
    const menuButton = page.getByLabel('Open menu');
    await menuButton.click();
    await expect(page.getByLabel('Close menu')).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Dashboard' })
    ).toBeVisible();

    await page.getByLabel('Close menu').click();
    await expect(page.getByLabel('Open menu')).toBeVisible();
  });

  test('header menu items navigate correctly', async ({ page }) => {
    await page.getByLabel('Open menu').click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/profile/);
  });

  test('notifications bell navigates to notifications', async ({ page }) => {
    await page.getByLabel('Notifications').click();
    await expect(page).toHaveURL(/\/notifications/);
  });
});
