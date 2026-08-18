import { test, expect } from '@playwright/test';

test('renders the spreadsheet grid', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('grid')).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'A' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'B' })).toBeVisible();
  await expect(page.getByLabel('Grid size')).toHaveText('10 rows x 5 columns');
});

test('edits a cell by double-clicking', async ({ page }) => {
  await page.goto('/');

  const firstCell = page.getByRole('gridcell').first();
  await firstCell.dblclick();
  const editor = page.getByLabel('Cell value');
  await editor.fill('Hello');
  await editor.press('Enter');

  await expect(page.getByText('Hello')).toBeVisible();
  await expect(page.getByLabel('Active cell')).toHaveText('A2');
});

test('adds a row and a column from the toolbar', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add row' }).click();
  await page.getByRole('button', { name: 'Add column' }).click();

  await expect(page.getByLabel('Grid size')).toHaveText('11 rows x 6 columns');
});

test('deletes a row and a column from the toolbar', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Delete row' }).click();
  await page.getByRole('button', { name: 'Delete column' }).click();

  await expect(page.getByLabel('Grid size')).toHaveText('9 rows x 4 columns');
});

test('undo restores a cleared cell', async ({ page }) => {
  await page.goto('/');

  const firstCell = page.getByRole('gridcell').first();
  await firstCell.dblclick();
  const editor = page.getByLabel('Cell value');
  await editor.fill('data');
  await editor.press('Enter');

  await firstCell.dblclick();
  await editor.fill('');
  await editor.press('Enter');
  await expect(page.getByText('data')).toBeHidden();

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(page.getByText('data')).toBeVisible();
});
