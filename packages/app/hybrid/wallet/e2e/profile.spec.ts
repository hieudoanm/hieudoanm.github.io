import { test, expect } from '@playwright/test';
import { login, waitForData } from './helpers';

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
    await expect(
      page.getByRole('main').getByText('alex@example.com')
    ).toBeVisible();
  });

  test('dark mode toggle switches theme', async ({ page }) => {
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const toggle = page.locator('input.toggle').first();
    await toggle.click();

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('theme picker changes theme', async ({ page }) => {
    const html = page.locator('html');

    const themeButton = page.locator('button[data-theme="dark"]');
    await themeButton.click();

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).toBe('dark');
  });

  test('sign out button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  });
});
