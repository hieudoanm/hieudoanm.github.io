import { expect, test } from '@playwright/test';

test.describe('About Page', () => {
  test('displays app info', async ({ page }) => {
    await page.goto('/about/');
    await expect(page).toHaveTitle(/Resume/);
    await expect(page.locator('text=Free Resume Builder')).toBeVisible();
    await expect(
      page.getByText('32 Free Templates', { exact: true })
    ).toBeVisible();
  });
});
