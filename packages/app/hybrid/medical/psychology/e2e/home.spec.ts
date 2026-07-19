import { test, expect } from '@playwright/test';
import path from 'path';

test('page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Psychology');
});

test('home lists all eight scales', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Psychology' })).toBeVisible();
  for (const slug of [
    'beck-depression-inventory',
    'big-five-inventory',
    'dyadic-adjustment-scale',
    'experiences-in-close-relationships',
    'generalized-anxiety-disorder',
    'patient-health-questionnaire',
    'relationship-closeness-inventory',
    'satisfaction-with-life',
  ]) {
    await expect(page.getByTestId(`tool-card-${slug}`)).toBeVisible();
  }
});

test('SWLS flow completes from home to results', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tool-card-satisfaction-with-life').click();
  await expect(
    page.getByRole('heading', { name: 'Satisfaction With Life Scale' })
  ).toBeVisible();

  for (const button of await page
    .getByRole('button', { name: '6', exact: true })
    .all()) {
    await button.click();
  }

  await page.getByRole('button', { name: /See Results/i }).click();
  await expect(page.getByText('Life Satisfaction Score')).toBeVisible();
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
