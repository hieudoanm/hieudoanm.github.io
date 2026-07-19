import { test, expect } from '@playwright/test';
import { login, waitForData } from './helpers';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Cards page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/cards');
    await waitForData(page);
  });

  test('renders all cards', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Cards' }).first()
    ).toBeVisible();
    await expect(page.getByText('Main Card').first()).toBeVisible();
    await expect(page.getByText('Business Card').first()).toBeVisible();
    await expect(page.getByText('Travel Card').first()).toBeVisible();
  });

  test('clicking card selects it and shows detail', async ({ page }) => {
    await page.getByText('Business Card').first().click();
    await expect(
      page.getByRole('heading', { name: 'Business Card' }).first()
    ).toBeVisible();
    await expect(page.getByText('Mastercard').first()).toBeVisible();
  });

  test('frozen card shows frozen badge', async ({ page }) => {
    await page.getByText('Travel Card').first().click();
    await expect(page.getByText('Frozen').first()).toBeVisible();
  });
});
