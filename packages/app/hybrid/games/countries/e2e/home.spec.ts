import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Countries Games'
    );
  });

  test('all 7 game cards are visible', async ({ page }) => {
    const gameNames = [
      'Country Wordle',
      'Country Connections',
      'Border Guesser',
      'Continents Sort',
      'Emoji Guesser',
      'Flag Guesser',
      'Higher or Lower',
    ];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Country Wordle card navigates to wordle page', async ({
    page,
  }) => {
    await page.getByTestId('open-wordle').click();
    await expect(page).toHaveURL('/wordle/');
  });

  test('clicking Country Connections card navigates to connections page', async ({
    page,
  }) => {
    await page.getByTestId('open-connections').click();
    await expect(page).toHaveURL('/connections/');
  });

  test('clicking Border Guesser card navigates to border page', async ({
    page,
  }) => {
    await page.getByTestId('open-border').click();
    await expect(page).toHaveURL('/border/');
  });

  test('clicking Continents Sort card navigates to continents-sort page', async ({
    page,
  }) => {
    await page.getByTestId('open-continents-sort').click();
    await expect(page).toHaveURL('/continents-sort/');
  });

  test('clicking Emoji Guesser card navigates to emoji-guesser page', async ({
    page,
  }) => {
    await page.getByTestId('open-emoji-guesser').click();
    await expect(page).toHaveURL('/emoji-guesser/');
  });

  test('clicking Flag Guesser card navigates to flag-guesser page', async ({
    page,
  }) => {
    await page.getByTestId('open-flag-guesser').click();
    await expect(page).toHaveURL('/flag-guesser/');
  });

  test('clicking Higher or Lower card navigates to higher-or-lower page', async ({
    page,
  }) => {
    await page.getByTestId('open-higher-or-lower').click();
    await expect(page).toHaveURL('/higher-or-lower/');
  });
});
