import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Memory Games'
    );
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Memory/);
  });

  test('all 6 game cards are visible', async ({ page }) => {
    const gameNames = [
      'Memory',
      'Gambling',
      'Puzzles',
      'Nikoli',
      'Tic-Tac-Toe',
      '8-Bit',
    ];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
