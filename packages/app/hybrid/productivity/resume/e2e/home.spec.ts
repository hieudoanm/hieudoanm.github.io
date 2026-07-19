import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Resume/);
  });

  test('shows the builder header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toContainText('Free Resume Builder');
  });

  test('renders the preview sheet', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#resume-sheet')).toBeVisible();
  });

  test('shows 32 templates in the picker', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /templates/i }).click();
    await expect(
      page.getByLabel('Template results').locator('button')
    ).toHaveCount(32);
  });

  test('filters templates by search', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /templates/i }).click();
    await page.getByLabel('Search templates').fill('serif');
    await expect(page.getByLabel('Template results')).toContainText('Classic');
    await expect(page.getByLabel('Template results')).toContainText('Elegant');
    await expect(page.getByLabel('Template results')).not.toContainText('Nova');
  });

  test('shows all template names', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /templates/i }).click();
    await expect(page.getByRole('button', { name: /^Classic/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Modern/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Elegant/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Creative/ })).toBeVisible();
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
