import { test, expect } from '@playwright/test';
import { TAX_ROOT, gotoTax, waitForData } from './helpers';

test.describe('Tax navigation (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await gotoTax(page);
    await waitForData(page);
  });

  test('sidebar renders links', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Dashboard')).toBeVisible();
    await expect(sidebar.getByText('Submissions')).toBeVisible();
    await expect(sidebar.getByText('Audits')).toBeVisible();
    await expect(sidebar.getByText('Settings')).toBeVisible();
  });

  test('sidebar links navigate correctly', async ({ page }) => {
    const sidebar = page.locator('aside');

    await sidebar.getByText('Submissions').click();
    await expect(page).toHaveURL(new RegExp(`${TAX_ROOT}/submission`));

    await sidebar.getByText('Audits').click();
    await expect(page).toHaveURL(new RegExp(`${TAX_ROOT}/audit`));
  });
});

test.describe('Tax navigation (mobile)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await gotoTax(page);
    await waitForData(page);
  });

  test('bottom nav renders items', async ({ page }) => {
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Submit')).toBeVisible();
    await expect(page.getByText('Audit')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
  });

  test('bottom nav links navigate correctly', async ({ page }) => {
    await page.getByText('Submit').click();
    await expect(page).toHaveURL(new RegExp(`${TAX_ROOT}/submission`));

    await page.getByText('Audit').click();
    await expect(page).toHaveURL(new RegExp(`${TAX_ROOT}/audit`));
  });
});
