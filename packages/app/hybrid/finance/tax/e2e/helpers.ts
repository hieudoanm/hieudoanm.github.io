import { Page } from '@playwright/test';

export const login = async (page: Page) => {
  await page.goto('/login');
  await page.getByPlaceholder('email@example.com').fill('test@example.com');
  await page.getByPlaceholder('••••••••').fill('password123');
  await page.getByRole('button', { name: 'Dang nhap' }).click();
  await page.waitForURL('/');
};

export const waitForData = async (page: Page) => {
  const spinner = page.locator('.loading-spinner');
  if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
    await spinner.waitFor({ state: 'hidden', timeout: 15000 });
  }
};
