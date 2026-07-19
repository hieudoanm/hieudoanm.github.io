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

test.describe('API Client', () => {
  test('sends a request and displays the response', async ({ page }) => {
    await page.route('https://api.example.com/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
      })
    );

    await page.goto('/');
    await page.getByLabel('Request URL').fill('https://api.example.com/users');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('200', { exact: true })).toBeVisible();
    await expect(page.getByText('OK', { exact: true })).toBeVisible();
    await expect(page.getByText(/"ok": true/)).toBeVisible();
  });

  test('shows error when sending without a URL', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Please enter a URL')).toBeVisible();
  });

  test('shows error when the request fails', async ({ page }) => {
    await page.route('https://api.example.com/**', (route) => route.abort());

    await page.goto('/');
    await page.getByLabel('Request URL').fill('https://api.example.com/fail');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('Failed to fetch')).toBeVisible();
  });

  test('appends query params to the request URL', async ({ page }) => {
    let requestedUrl = '';
    await page.route('https://api.example.com/**', (route) => {
      requestedUrl = route.request().url();
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '[]',
      });
    });

    await page.goto('/');
    await page.getByLabel('Request URL').fill('https://api.example.com/users');
    await page.getByLabel('Query parameter key').fill('page');
    await page.getByLabel('Query parameter value').fill('2');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('200', { exact: true })).toBeVisible();
    expect(requestedUrl).toBe('https://api.example.com/users?page=2');
  });

  test('sends a POST request with a JSON body', async ({ page }) => {
    let requestedBody = '';
    await page.route('https://api.example.com/**', async (route) => {
      requestedBody = route.request().postData() ?? '';
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: '{"id":1}',
      });
    });

    await page.goto('/');
    await page.getByLabel('HTTP method').selectOption('POST');
    await page.getByLabel('Request URL').fill('https://api.example.com/users');
    await page.locator('.tab:has-text("Body")').click();
    await page.getByLabel('Request body').fill('{"name":"Ada"}');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('201', { exact: true })).toBeVisible();
    expect(requestedBody).toBe('{"name":"Ada"}');
  });

  test('records the request in history and reuses it', async ({ page }) => {
    await page.route('https://api.example.com/**', (route) =>
      route.fulfill({ status: 200, body: '{}' })
    );

    await page.goto('/');
    await page.getByLabel('Request URL').fill('https://api.example.com/users');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('200', { exact: true })).toBeVisible();

    await page.getByLabel('Request URL').fill('https://api.example.com/other');
    await page.getByText('https://api.example.com/users').click();

    await expect(page.getByLabel('Request URL')).toHaveValue(
      'https://api.example.com/users'
    );
  });

  test('auth tab offers bearer and basic options', async ({ page }) => {
    await page.goto('/');
    await page.locator('.tab:has-text("Auth")').click();
    const authSelect = page.getByLabel('Auth type');
    await expect(authSelect).toHaveValue('none');
    await authSelect.selectOption('bearer');
    await expect(page.getByLabel('Bearer token')).toBeVisible();
    await authSelect.selectOption('basic');
    await expect(page.getByLabel('Basic username')).toBeVisible();
    await expect(page.getByLabel('Basic password')).toBeVisible();
  });
});
