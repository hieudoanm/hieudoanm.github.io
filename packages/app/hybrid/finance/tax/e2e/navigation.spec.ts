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

test.describe('Login page', () => {
  test('renders login form', async ({ page }) => {
    await page.goto('/login');
    await expect(
      page.getByRole('heading', { name: 'Dang Nhap' })
    ).toBeVisible();
    await expect(page.getByPlaceholder('email@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dang nhap' })).toBeVisible();
  });

  test('form submits and navigates to personal', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('email@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: 'Dang nhap' }).click();
    await expect(page).toHaveURL(/\/personal/);
  });
});

test.describe('Register page', () => {
  test('renders register form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'Dang Ky' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dang ky' })).toBeVisible();
  });

  test('form submits and navigates to personal', async ({ page }) => {
    await page.goto('/register');
    await page.locator('input[type="text"]').fill('Test User');
    await page.getByPlaceholder('email@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: 'Dang ky' }).click();
    await expect(page).toHaveURL(/\/personal/);
  });
});

test.describe('Navigation (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('email@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: 'Dang nhap' }).click();
    await page.waitForURL(/\/personal/);
  });

  test('personal sidebar renders links', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Dashboard')).toBeVisible();
    await expect(sidebar.getByText('Calculator')).toBeVisible();
    await expect(sidebar.getByText('Business')).toBeVisible();
    await expect(sidebar.getByText('Profile')).toBeVisible();
  });

  test('sidebar links navigate correctly', async ({ page }) => {
    const sidebar = page.locator('aside');

    await sidebar.getByText('Calculator').click();
    await expect(page).toHaveURL(/\/personal\/calculator/);

    await sidebar.getByText('Business').click();
    await expect(page).toHaveURL(/\/business/);
  });
});

test.describe('Navigation (mobile)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('email@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: 'Dang nhap' }).click();
    await page.waitForURL(/\/personal/);
  });

  test('personal bottom nav renders items', async ({ page }) => {
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Calculate')).toBeVisible();
    await expect(page.getByText('Business')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
  });

  test('bottom nav links navigate correctly', async ({ page }) => {
    await page.getByText('Calculate').click();
    await expect(page).toHaveURL(/\/personal\/calculator/);

    await page.getByText('Business').click();
    await expect(page).toHaveURL(/\/business/);
  });
});
