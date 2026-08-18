import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Calendar'
    );
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Calendar/);
  });

  test('year selector is visible', async ({ page }) => {
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('view switcher dropdown is visible', async ({ page }) => {
    await expect(page.getByRole('combobox')).toBeVisible();
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

  test('clicking CALENDAR link returns home', async ({ page }) => {
    await page.getByText('About').click();
    await expect(page).toHaveURL('/about/');
    await page.getByText('CALENDAR').click();
    await expect(page).toHaveURL('/');
  });
});
