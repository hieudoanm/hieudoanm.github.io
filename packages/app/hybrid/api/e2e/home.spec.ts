import { test, expect } from '@playwright/test';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/API Client/);
  });

  test('displays the API Client heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1:has-text("API Client")')).toBeVisible();
  });

  test('displays the HTTP method selector', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('HTTP method')).toBeVisible();
  });

  test('method selector defaults to GET', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('HTTP method')).toHaveValue('GET');
  });

  test('method selector offers all HTTP methods', async ({ page }) => {
    await page.goto('/');
    const select = page.getByLabel('HTTP method');
    const options = await select.locator('option').allTextContents();
    expect(options).toEqual(
      expect.arrayContaining([
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'HEAD',
        'OPTIONS',
      ])
    );
  });

  test('displays the request URL input', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Request URL')).toBeVisible();
  });

  test('displays the send button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
  });

  test('shows request configuration tabs', async ({ page }) => {
    await page.goto('/');
    for (const tab of ['Params', 'Headers', 'Body', 'Auth']) {
      await expect(page.locator(`.tab:has-text("${tab}")`)).toBeVisible();
    }
  });

  test('shows empty history state', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('No requests yet')).toBeVisible();
  });

  test('shows empty response state', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByText('Send a request to see the response here.')
    ).toBeVisible();
  });

  test('has navigation links to info pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Version' })).toBeVisible();
  });
});
