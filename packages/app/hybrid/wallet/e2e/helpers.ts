import { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill('test@example.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('/');
}

export async function waitForData(page: Page) {
  const spinner = page.locator('.loading-spinner');
  if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
    await spinner.waitFor({ state: 'hidden', timeout: 15000 });
  }
}
