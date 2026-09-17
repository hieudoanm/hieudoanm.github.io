import { test, expect } from '@playwright/test';
import path from 'path';
import { TAX_ROOT, gotoTax, waitForData } from './helpers';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Tax dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTax(page);
  });

  test('loads without signing in', async ({ page }) => {
    await waitForData(page);
    await expect(
      page.getByRole('heading', { name: 'Doanh Nghiep' })
    ).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tax/i);
  });

  test('displays statistics cards', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Doanh nghiep')).toBeVisible();
    await expect(page.getByText('Khai bao')).toBeVisible();
  });

  test('displays recent submissions', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Khai bao gan day')).toBeVisible();
  });
});

test.describe('Tax submissions', () => {
  test.beforeEach(async ({ page }) => {
    await gotoTax(page, `${TAX_ROOT}/submission`);
  });

  test('renders submissions list', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Khai Bao Thue' })
    ).toBeVisible();
  });

  test('displays submission cards', async ({ page }) => {
    await waitForData(page);
    await expect(
      page.getByText('Cong Ty TNHH TechViet Solutions')
    ).toBeVisible();
  });
});

test.describe('New tax submission', () => {
  test('renders new submission form', async ({ page }) => {
    await gotoTax(page, `${TAX_ROOT}/submission/new`);
    await expect(
      page.getByRole('heading', { name: 'Tao Khai Bao Moi' })
    ).toBeVisible();
  });
});

test.describe('Tax audits', () => {
  test('renders audits list', async ({ page }) => {
    await gotoTax(page, `${TAX_ROOT}/audit`);
    await expect(
      page.getByRole('heading', { name: 'Kiem Toan Thue' })
    ).toBeVisible();
  });
});

test.describe('Tax settings', () => {
  test('renders settings page', async ({ page }) => {
    await gotoTax(page, `${TAX_ROOT}/settings`);
    await expect(page.getByRole('heading', { name: 'Cai Dat' })).toBeVisible();
  });
});
