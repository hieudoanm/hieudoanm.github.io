import { expect, test } from '@playwright/test';
import path from 'path';

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

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/about');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'about.png'),
  });
});
