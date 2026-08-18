import { test, expect } from '@playwright/test';

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

  test('all 4 game cards are visible', async ({ page }) => {
    const gameNames = ['Memory Match', 'Pi', 'N-Back', 'Recall'];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Memory Match card navigates to memory-match page', async ({
    page,
  }) => {
    await page.getByText('Memory Match', { exact: true }).click();
    await expect(page).toHaveURL('/memory-match/');
  });

  test('clicking Pi card navigates to pi page', async ({ page }) => {
    await page.getByText('Pi', { exact: true }).click();
    await expect(page).toHaveURL('/pi/');
  });

  test('clicking N-Back card navigates to n-back page', async ({ page }) => {
    await page.getByText('N-Back', { exact: true }).click();
    await expect(page).toHaveURL('/n-back/');
  });

  test('clicking Recall card navigates to recall page', async ({ page }) => {
    await page.getByText('Recall', { exact: true }).click();
    await expect(page).toHaveURL('/recall/');
  });

  test('header MEMORY GAMES link navigates home', async ({ page }) => {
    await page.getByText('Memory Match', { exact: true }).click();
    await expect(page).toHaveURL('/memory-match/');
    await page.getByText('MEMORY GAMES').click();
    await expect(page).toHaveURL('/');
  });
});
