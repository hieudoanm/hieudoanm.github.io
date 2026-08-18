import { test, expect } from '@playwright/test';

test('loads the vault and renders the first note', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  await expect(page.getByLabel('Search notes')).toBeVisible();
  await expect(page.getByLabel('Notes graph')).toBeVisible();
});

test('switches view modes and shows the preview', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Preview').click();
  await expect(page.getByTestId('markdown-preview')).toBeVisible();
});

test('opens the notes graph', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Notes graph').click();
  await expect(page.getByRole('heading', { name: 'Graph' })).toBeVisible();
  await page.getByLabel('Close graph').click();
  await expect(page.getByRole('heading', { name: 'Graph' })).toBeHidden();
});

test('creates a new note from the sidebar', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('New note').first().click();
  await expect(page.getByRole('heading', { name: 'Untitled' })).toBeVisible();
});
