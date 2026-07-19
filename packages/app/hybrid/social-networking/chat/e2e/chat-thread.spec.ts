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

test.describe('Chat Thread', () => {
  test('creates new chat and navigates to it', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(page).toHaveURL(/\/chat\/?\?id=/);
  });

  test('chat page displays textarea input', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(
      page.locator('textarea[placeholder*="Type a message"]')
    ).toBeVisible();
  });

  test('chat page displays send button', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(page.locator('button[title="Send message"]')).toBeVisible();
  });

  test('chat page displays attach button', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    await expect(page.locator('button[title="Attach file"]')).toBeVisible();
  });

  test('send button is disabled when input is empty', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const sendButton = page.locator('button[title="Send message"]');
    await expect(sendButton).toBeDisabled();
  });

  test('send button becomes enabled when text is entered', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const input = page.locator('textarea[placeholder*="Type a message"]');
    await input.fill('Hello');
    const sendButton = page.locator('button[title="Send message"]');
    await expect(sendButton).toBeEnabled();
  });

  test('can type in the input field', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const input = page.locator('textarea[placeholder*="Type a message"]');
    await input.fill('Hello, world!');
    await expect(input).toHaveValue('Hello, world!');
  });

  test('send button is disabled after sending empty message', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('button:has-text("New Chat")').click();
    const sendButton = page.locator('button[title="Send message"]');
    await expect(sendButton).toBeDisabled();
  });
});
