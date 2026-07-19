import { test, expect } from '@playwright/test';
import path from 'path';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('History');
});

test('home lists the through the years tool', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  await expect(page.getByTestId('tool-card-through-the-years')).toBeVisible();
});

test('navigating to through the years works', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-through-the-years').click();
  await expect(
    page.getByRole('heading', { name: 'Through the Years' })
  ).toBeVisible();
});

test('about page loads', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText('About')).toBeVisible();
  await expect(page.getByText('History')).toBeVisible();
});

test('downloads page loads', async ({ page }) => {
  await page.goto('/downloads');

  await expect(page.getByText('Downloads')).toBeVisible();
  await expect(page.getByText('Installers')).toBeVisible();
});

test('version page loads', async ({ page }) => {
  await page.goto('/version');

  await expect(page.getByText('Version')).toBeVisible();
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent');

  await expect(page.getByText('404')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
