import { test, expect } from '@playwright/test';
import path from 'path';

test('loads about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('h1').first()).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/about');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'about.png'),
  });
});

