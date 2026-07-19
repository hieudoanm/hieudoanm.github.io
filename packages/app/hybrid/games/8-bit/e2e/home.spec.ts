import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '8-BIT GAMES'
    );
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/8-Bit/);
  });

  test('all 4 game cards are visible', async ({ page }) => {
    const gameNames = ['MAZE', 'SNAKE', 'DINO RUN', 'ROCK PAPER SCISSORS'];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Maze card navigates to maze page', async ({ page }) => {
    await page.getByText('MAZE', { exact: true }).click();
    await expect(page).toHaveURL('/maze/');
  });

  test('clicking Snake card navigates to snake page', async ({ page }) => {
    await page.getByText('SNAKE', { exact: true }).click();
    await expect(page).toHaveURL('/snake/');
  });

  test('clicking Dino Run card navigates to dino-run page', async ({
    page,
  }) => {
    await page.getByText('DINO RUN', { exact: true }).click();
    await expect(page).toHaveURL('/dino-run/');
  });

  test('clicking Rock Paper Scissors card navigates to rock-paper-scissors page', async ({
    page,
  }) => {
    await page.getByText('ROCK PAPER SCISSORS', { exact: true }).click();
    await expect(page).toHaveURL('/rock-paper-scissors/');
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
