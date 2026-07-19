import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Chat/);
  });

  test('displays chat heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Chat')).toBeVisible();
  });

  test('has new chat button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=New Chat')).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});

test.describe('Chat Thread', () => {
  test('navigates to chat thread', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=New Chat').click();
    await expect(page).toHaveURL(/\/chat\//);
  });

  test('displays chat input', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=New Chat').click();
    await expect(
      page.locator('textarea[placeholder*="Type a message"]')
    ).toBeVisible();
  });

  test('sends a message', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=New Chat').click();
    const input = page.locator('textarea[placeholder*="Type a message"]');
    await input.fill('Hello, world!');
    await input.press('Enter');
    await expect(page.locator('text=Hello, world!')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('displays theme selector', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Theme')).toBeVisible();
  });

  test('displays model selector', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Default Model')).toBeVisible();
  });
});

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Profile')).toBeVisible();
  });

  test('displays user information', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=User Information')).toBeVisible();
  });
});
