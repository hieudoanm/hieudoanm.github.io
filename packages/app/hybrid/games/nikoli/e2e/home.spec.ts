import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Nikoli Puzzles'
    );
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle('Nikoli Puzzles');
  });

  test('all 7 game cards are visible', async ({ page }) => {
    const gameNames = [
      'Sudoku',
      'Nurikabe',
      'Masyu',
      'Shikaku',
      'Fillomino',
      'Norinori',
      'Heyawake',
    ];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Sudoku card navigates to sudoku page', async ({ page }) => {
    await page.getByText('Sudoku', { exact: true }).click();
    await expect(page).toHaveURL('/sudoku/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Nurikabe card navigates to nurikabe page', async ({
    page,
  }) => {
    await page.getByText('Nurikabe', { exact: true }).click();
    await expect(page).toHaveURL('/nurikabe/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Masyu card navigates to masyu page', async ({ page }) => {
    await page.getByText('Masyu', { exact: true }).click();
    await expect(page).toHaveURL('/masyu/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Shikaku card navigates to shikaku page', async ({ page }) => {
    await page.getByText('Shikaku', { exact: true }).click();
    await expect(page).toHaveURL('/shikaku/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Fillomino card navigates to fillomino page', async ({
    page,
  }) => {
    await page.getByText('Fillomino', { exact: true }).click();
    await expect(page).toHaveURL('/fillomino/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Norinori card navigates to norinori page', async ({
    page,
  }) => {
    await page.getByText('Norinori', { exact: true }).click();
    await expect(page).toHaveURL('/norinori/');
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('clicking Heyawake card navigates to heyawake page', async ({
    page,
  }) => {
    await page.getByText('Heyawake', { exact: true }).click();
    await expect(page).toHaveURL('/heyawake/');
    await expect(page.getByText('← Back')).toBeVisible();
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
