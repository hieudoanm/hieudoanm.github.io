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

test.describe('Exchange page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/exchange');
    await waitForData(page);
  });

  test('loads with default conversion', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Exchange' })).toBeVisible();
    await expect(page.getByText('You get')).toBeVisible();
    await expect(page.getByText('1 USD')).toBeVisible();
  });

  test('swap button exchanges currencies', async ({ page }) => {
    await page.getByLabel('Swap currencies').click();
    await expect(page.getByText('1 EUR')).toBeVisible();
  });

  test('changing amount updates conversion', async ({ page }) => {
    const amountInput = page.locator('input[type="number"]').first();
    await amountInput.fill('2000');
    await expect(page.getByText('€1,840.00')).toBeVisible();
  });
});
