import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Clock');
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Clock/);
  });

  test('header navigation links are visible', async ({ page }) => {
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Downloads')).toBeVisible();
    await expect(page.getByText('Version')).toBeVisible();
  });

  test('clicking About navigates to about page', async ({ page }) => {
    await page.getByText('About').click();
    await expect(page).toHaveURL('/about/');
  });

  test('clicking Downloads navigates to downloads page', async ({ page }) => {
    await page.getByText('Downloads').click();
    await expect(page).toHaveURL('/downloads/');
  });

  test('clicking Version navigates to version page', async ({ page }) => {
    await page.getByText('Version').click();
    await expect(page).toHaveURL('/version/');
  });

  test('clicking CLOCK link returns home', async ({ page }) => {
    await page.getByText('About').click();
    await expect(page).toHaveURL('/about/');
    await page.getByText('CLOCK').click();
    await expect(page).toHaveURL('/');
  });

  test('theme toggle is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /theme/i })).toBeVisible();
  });

  test('tab navigation shows all clock apps', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Pomodoro' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Watchface' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'World Clock' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Timer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stopwatch' })).toBeVisible();
  });
});
