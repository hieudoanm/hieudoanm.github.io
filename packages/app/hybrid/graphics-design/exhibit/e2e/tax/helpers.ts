import { Page } from '@playwright/test';

export const TAX_ROOT = '/tax';

/** Tax is open, so specs navigate straight to the route without signing in. */
export const gotoTax = async (page: Page, path = TAX_ROOT) => {
  await page.goto(path);
  await page.waitForURL((url) => url.pathname.startsWith(TAX_ROOT));
};

export const waitForData = async (page: Page) => {
  const spinner = page.locator('.loading-spinner');
  if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
    await spinner.waitFor({ state: 'hidden', timeout: 15000 });
  }
};
