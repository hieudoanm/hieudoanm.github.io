import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Version Page', () => {
  test('displays a build version', async ({ page }) => {
    await page.goto('/version/');
    await expect(page.locator('text=Build version')).toBeVisible();
    await expect(
      page.locator('button[aria-label="Copy version"]')
    ).toBeVisible();
  });
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/version');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'version.png'),
  });
});
