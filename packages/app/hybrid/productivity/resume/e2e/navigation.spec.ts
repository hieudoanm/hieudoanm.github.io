import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates to about and back home', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a', { hasText: 'About' }).click();
    await expect(page).toHaveURL(/\/about\//);
    await expect(page.locator('text=About')).toBeVisible();
    await page.locator('text=Free Resume Builder').first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('navigates to version page', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a', { hasText: 'Version' }).click();
    await expect(page).toHaveURL(/\/version\//);
  });

  test('shows a 404 page for unknown routes', async ({ page }) => {
    await page.goto('/does-not-exist/');
    await expect(page.locator('text=Page not found')).toBeVisible();
  });
});
