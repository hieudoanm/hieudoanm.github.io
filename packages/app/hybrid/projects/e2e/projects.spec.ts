import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Projects/);
  });

  test('displays projects heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Projects')).toBeVisible();
  });

  test('has new board button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=New Board')).toBeVisible();
  });

  test('displays all boards section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=All Boards')).toBeVisible();
  });
});

test.describe('Board Page', () => {
  test('navigates to board from home', async ({ page }) => {
    await page.goto('/');
    const board = page.locator('a[href^="/board/"]').first();
    await board.click();
    await expect(page).toHaveURL(/\/board\//);
  });
});

test.describe('Settings Page', () => {
  test('loads settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });
});

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Profile')).toBeVisible();
  });
});
