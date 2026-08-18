import { expect, test } from '@playwright/test';

test.describe('Version Page', () => {
  test('displays a build version', async ({ page }) => {
    await page.goto('/version/');
    await expect(page.locator('text=Build version')).toBeVisible();
    await expect(
      page.locator('button[aria-label="Copy version"]')
    ).toBeVisible();
  });
});
