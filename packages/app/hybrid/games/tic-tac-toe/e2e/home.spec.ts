import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Tic-Tac-Toe Variants'
    );
  });

  test('all 6 game cards are visible', async ({ page }) => {
    const gameNames = ['Classic', 'Duck', 'Notakto', 'Reverse', 'T3', 'Wild'];

    for (const name of gameNames) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test('clicking Classic card navigates to classic page', async ({ page }) => {
    await page.getByTestId('open-classic').click();
    await expect(page).toHaveURL('/classic/');
  });

  test('clicking Duck card navigates to duck page', async ({ page }) => {
    await page.getByTestId('open-duck').click();
    await expect(page).toHaveURL('/duck/');
  });

  test('clicking Notakto card navigates to notakto page', async ({ page }) => {
    await page.getByTestId('open-notakto').click();
    await expect(page).toHaveURL('/notakto/');
  });

  test('clicking Reverse card navigates to reverse page', async ({ page }) => {
    await page.getByTestId('open-reverse').click();
    await expect(page).toHaveURL('/reverse/');
  });

  test('clicking T3 card navigates to t3 page', async ({ page }) => {
    await page.getByTestId('open-t3').click();
    await expect(page).toHaveURL('/t3/');
  });

  test('clicking Wild card navigates to wild page', async ({ page }) => {
    await page.getByTestId('open-wild').click();
    await expect(page).toHaveURL('/wild/');
  });
});
