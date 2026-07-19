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

test.describe('Tax Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/calculator');
  });

  test('renders calculator form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Tinh Thue' })
    ).toBeVisible();
    await expect(page.getByText('Input')).toBeVisible();
    await expect(page.getByText('Results')).toBeVisible();
  });

  test('displays default values', async ({ page }) => {
    await expect(page.locator('input[type="number"]').first()).toHaveValue(
      '20000000'
    );
  });

  test('toggle salary mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Gross → Net' }).click();
    await expect(
      page.getByRole('button', { name: 'Net → Gross' })
    ).toBeVisible();
  });

  test('switch to results tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Results' }).click();
    await expect(page.getByText('Khau tru')).toBeVisible();
    await expect(page.getByText('Thuc linh')).toBeVisible();
  });

  test('change period to annual', async ({ page }) => {
    await page.locator('select').selectOption('annual');
    await expect(page.locator('select')).toHaveValue('annual');
  });

  test('toggle insurance', async ({ page }) => {
    const toggle = page.locator('.toggle');
    await toggle.click();
    await expect(toggle).not.toBeChecked();
  });
});

test.describe('Tax Submissions', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/submission');
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

  test('click submission navigates to detail', async ({ page }) => {
    await waitForData(page);
    await page.getByText('Cong Ty TNHH TechViet Solutions').first().click();
    await expect(page).toHaveURL(/\/submission\//);
  });
});

test.describe('New Submission', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/submission/new');
  });

  test('renders new submission form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Tao Khai Bao Moi' })
    ).toBeVisible();
    await expect(page.getByText('Doanh nghiep')).toBeVisible();
    await expect(page.getByText('Loai thue')).toBeVisible();
  });

  test('form has company selector', async ({ page }) => {
    await expect(page.locator('select').first()).toBeVisible();
  });
});

test.describe('Tax Audits', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/audit');
  });

  test('renders audits list', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Kiem Toan Thue' })
    ).toBeVisible();
  });

  test('displays audit cards with risk scores', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Risk score')).toBeVisible();
  });
});
