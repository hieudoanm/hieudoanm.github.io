import { expect, test } from '@playwright/test';

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
    await expect(page.locator('button[aria-pressed]')).toHaveCount(32);
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
