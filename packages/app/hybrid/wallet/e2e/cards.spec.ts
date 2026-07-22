import { test, expect } from '@playwright/test';
import { waitForData } from './helpers';

test.describe('Cards page', () => {
  test('renders all cards', async ({ page }) => {
    await page.goto('/cards');
    await waitForData(page);
    await expect(page.getByRole('heading', { name: 'Cards' })).toBeVisible();
    await expect(page.getByText('Main Card').first()).toBeVisible();
    await expect(page.getByText('Business Card').first()).toBeVisible();
    await expect(page.getByText('Travel Card').first()).toBeVisible();
  });

  test('clicking card selects it and shows detail', async ({ page }) => {
    await page.goto('/cards');
    await waitForData(page);
    await page.getByText('Business Card').first().click();
    await expect(
      page.getByRole('heading', { name: 'Business Card' })
    ).toBeVisible();
    await expect(page.getByText('mastercard')).toBeVisible();
  });

  test('frozen card shows frozen badge', async ({ page }) => {
    await page.goto('/cards');
    await waitForData(page);
    await page.getByText('Travel Card').first().click();
    await expect(
      page
        .getByRole('heading', { name: 'Travel Card' })
        .locator('..')
        .getByText('Frozen')
    ).toBeVisible();
  });
});
