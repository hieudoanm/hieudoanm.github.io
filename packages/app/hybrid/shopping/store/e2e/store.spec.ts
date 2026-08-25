import { test, expect } from '@playwright/test';

test.describe('Store', () => {
  test('renders the home page with title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Store' })).toBeVisible();
  });

  test('displays section headings', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Hybrid' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Android' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'macOS' })).toBeVisible();
  });

  test('shows filter chips for platform and category', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByText('Platform', { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText('Category', { exact: true }).first()
    ).toBeVisible();
  });

  test('filters by platform chip', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'macOS', exact: true }).click();
    const cards = page.locator('[class*="card"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('filters by category chip', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Games' }).click();
    const cards = page.locator('[class*="card"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('searches for an app', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Search apps…').fill('Chess');
    const cards = page.locator('[class*="card"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test('clears filters', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Games' }).click();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(
      page.getByRole('button', { name: 'Clear filters' })
    ).not.toBeVisible();
  });

  test('navigates to app detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('shows download options on detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Download Options')).toBeVisible();
  });

  test('navigates back to store from detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await page.getByRole('link', { name: 'Back to Store' }).click();
    await expect(page.getByRole('heading', { name: 'Store' })).toBeVisible();
  });

  test('toggles theme', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'winter');
  });

  test('shows 404 for unknown routes', async ({ page }) => {
    const response = await page.goto('/nonexistent-page/');
    expect(response?.status()).toBe(404);
  });
});
