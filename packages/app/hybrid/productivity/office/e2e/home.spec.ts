import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Office Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Office');
  });

  test('page has correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/Office/);
  });

  test('calendar tool card is visible', async ({ page }) => {
    await expect(page.getByTestId('tool-card-calendar')).toBeVisible();
  });

  test('clicking calendar card navigates to calendar app', async ({
    page,
  }) => {
    await page.getByTestId('tool-card-calendar').click();
    await expect(page).toHaveURL('/calendar/');
    await expect(page.getByTestId('nav-today')).toBeVisible();
  });

  test('csv tool card is visible', async ({ page }) => {
    await expect(page.getByTestId('tool-card-csv')).toBeVisible();
  });

  test('clicking csv card navigates to csv app', async ({ page }) => {
    await page.getByTestId('tool-card-csv').click();
    await expect(page).toHaveURL('/csv/');
    await expect(page.getByRole('grid')).toBeVisible();
  });

  test('md tool card is visible', async ({ page }) => {
    await expect(page.getByTestId('tool-card-md')).toBeVisible();
  });

  test('clicking md card navigates to md app', async ({ page }) => {
    await page.getByTestId('tool-card-md').click();
    await expect(page).toHaveURL('/md/');
    await expect(page.getByLabel('Search notes')).toBeVisible();
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

  test('clicking Office brand link returns home', async ({ page }) => {
    await page.getByText('About').click();
    await expect(page).toHaveURL('/about/');
    await page.getByText('Office').click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Calendar App', () => {
  test('calendar page loads with correct heading', async ({ page }) => {
    await page.goto('/calendar/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Calendar'
    );
  });

  test('year selector is visible', async ({ page }) => {
    await page.goto('/calendar/');
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('view switcher dropdown is visible', async ({ page }) => {
    await page.goto('/calendar/');
    await expect(page.getByRole('combobox')).toBeVisible();
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