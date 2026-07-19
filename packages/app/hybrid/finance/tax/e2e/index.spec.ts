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

test.describe('Root redirect', () => {
  test('redirects to /personal', async ({ page }) => {
    await login(page);
    await page.goto('/');
    await expect(page).toHaveURL(/\/personal/);
  });
});

test.describe('Personal Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/personal');
  });

  test('loads successfully', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByRole('heading', { name: 'Ca Nhan' })).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Tax');
  });

  test('displays calculator card', async ({ page }) => {
    await waitForData(page);
    await expect(page.getByText('Tinh Thue')).toBeVisible();
  });

  test('calculator card navigates to calculator', async ({ page }) => {
    await waitForData(page);
    await page.getByText('Tinh Thue').first().click();
    await expect(page).toHaveURL(/\/personal\/calculator/);
  });
});

test.describe('Personal Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/personal/calculator');
  });

  test('renders calculator form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Tinh Thue Ca Nhan' })
    ).toBeVisible();
    await expect(page.getByText('Input')).toBeVisible();
    await expect(page.getByText('Results')).toBeVisible();
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
  });
});

test.describe('Business Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/business');
  });

  test('loads successfully', async ({ page }) => {
    await waitForData(page);
    await expect(
      page.getByRole('heading', { name: 'Doanh Nghiep' })
    ).toBeVisible();
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

test.describe('Business Submissions', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/business/submission');
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

test.describe('New Business Submission', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/business/submission/new');
  });

  test('renders new submission form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Tao Khai Bao Moi' })
    ).toBeVisible();
  });
});

test.describe('Business Audits', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/business/audit');
  });

  test('renders audits list', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Kiem Toan Thue' })
    ).toBeVisible();
  });
});

test.describe('Navigation between apps', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('personal sidebar has business link', async ({ page }) => {
    await page.goto('/personal');
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Business')).toBeVisible();
  });

  test('business sidebar has personal link', async ({ page }) => {
    await page.goto('/business');
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Personal')).toBeVisible();
  });

  test('can switch from personal to business', async ({ page }) => {
    await page.goto('/personal');
    const sidebar = page.locator('aside');
    await sidebar.getByText('Business').click();
    await expect(page).toHaveURL(/\/business/);
  });

  test('can switch from business to personal', async ({ page }) => {
    await page.goto('/business');
    const sidebar = page.locator('aside');
    await sidebar.getByText('Personal').click();
    await expect(page).toHaveURL(/\/personal/);
  });
});
