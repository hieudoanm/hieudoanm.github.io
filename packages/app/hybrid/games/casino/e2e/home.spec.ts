import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Casino Games'
    );
  });

  test('all 10 game cards are visible', async ({ page }) => {
    const gameNames = [
      'Baccarat',
      'Card Counter',
      'Poker Odds',
      'Over Under Seven',
      'Slot Machine',
      'Roulette',
      'Craps',
      'War',
      'Keno',
      'Hi-Lo',
    ];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Baccarat card navigates to baccarat page', async ({
    page,
  }) => {
    await page.getByTestId('open-baccarat').click();
    await expect(page).toHaveURL('/baccarat/');
  });

  test('clicking Card Counter card navigates to card-counter page', async ({
    page,
  }) => {
    await page.getByTestId('open-card-counter').click();
    await expect(page).toHaveURL('/card-counter/');
  });

  test('clicking Poker Odds card navigates to poker-odds page', async ({
    page,
  }) => {
    await page.getByTestId('open-poker-odds').click();
    await expect(page).toHaveURL('/poker-odds/');
  });

  test('clicking Over Under Seven card navigates to over-under-seven page', async ({
    page,
  }) => {
    await page.getByTestId('open-over-under-seven').click();
    await expect(page).toHaveURL('/over-under-seven/');
  });

  test('clicking Slot Machine card navigates to slot-machine page', async ({
    page,
  }) => {
    await page.getByTestId('open-slot-machine').click();
    await expect(page).toHaveURL('/slot-machine/');
  });

  test('clicking Roulette card navigates to roulette page', async ({
    page,
  }) => {
    await page.getByTestId('open-roulette').click();
    await expect(page).toHaveURL('/roulette/');
  });

  test('clicking Craps card navigates to craps page', async ({ page }) => {
    await page.getByTestId('open-craps').click();
    await expect(page).toHaveURL('/craps/');
  });

  test('clicking War card navigates to war page', async ({ page }) => {
    await page.getByTestId('open-war').click();
    await expect(page).toHaveURL('/war/');
  });

  test('clicking Keno card navigates to keno page', async ({ page }) => {
    await page.getByTestId('open-keno').click();
    await expect(page).toHaveURL('/keno/');
  });

  test('clicking Hi-Lo card navigates to hi-lo page', async ({ page }) => {
    await page.getByTestId('open-hi-lo').click();
    await expect(page).toHaveURL('/hi-lo/');
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
