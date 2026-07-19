import { test, expect } from '@playwright/test';
import path from 'path';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Music');
});

test('home lists the pitch tool', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Music' })).toBeVisible();
  await expect(page.getByTestId('tool-card-pitch')).toBeVisible();
});

test('navigating to pitch works', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-pitch').click();
  await expect(page.getByRole('heading', { name: 'Pitch' })).toBeVisible();
});

test('about page loads', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByText('About')).toBeVisible();
  await expect(page.getByText('Music')).toBeVisible();
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
