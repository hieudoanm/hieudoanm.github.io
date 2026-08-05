import { test, expect } from '@playwright/test';

test('version history commits and restores project snapshots', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('demo-brainbow.tif')).toBeVisible();

  await page.getByRole('button', { name: 'Open version history' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Version history' })
  ).toBeVisible();

  await page.getByLabel('Snapshot message').fill('First trace');
  await page.getByRole('button', { name: 'Save snapshot' }).click();
  await expect(page.getByText('First trace')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Restore First trace' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Close version history' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Version history' })
  ).not.toBeVisible();
});
