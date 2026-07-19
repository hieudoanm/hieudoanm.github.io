import { test, expect } from '@playwright/test';

test.describe('CSV App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/csv/');
  });

  test('renders the spreadsheet grid', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'A' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'B' })).toBeVisible();
    await expect(page.getByLabel('Grid size')).toHaveText(
      '10 rows x 5 columns'
    );
  });

  test('edits a cell by double-clicking', async ({ page }) => {
    const firstCell = page.getByRole('gridcell').first();
    await firstCell.dblclick();
    const editor = page.getByLabel('Cell value');
    await editor.fill('Hello');
    await editor.press('Enter');

    await expect(page.getByText('Hello')).toBeVisible();
    await expect(page.getByLabel('Active cell')).toHaveText('A2');
  });

  test('adds a row and a column from the toolbar', async ({ page }) => {
    await page.getByRole('button', { name: 'Add row' }).click();
    await page.getByRole('button', { name: 'Add column' }).click();

    await expect(page.getByLabel('Grid size')).toHaveText(
      '11 rows x 6 columns'
    );
  });

  test('deletes a row and a column from the toolbar', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete row' }).click();
    await page.getByRole('button', { name: 'Delete column' }).click();

    await expect(page.getByLabel('Grid size')).toHaveText('9 rows x 4 columns');
  });

  test('undo restores a cleared cell', async ({ page }) => {
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
});

test.describe('Markdown App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/md/');
  });

  test('loads the vault and renders the first note', async ({ page }) => {
    await expect(page.getByLabel('Search notes')).toBeVisible();
    await expect(page.getByLabel('Notes graph')).toBeVisible();
    await expect(page.locator('.cm-editor')).toBeVisible();
  });

  test('switches view modes and shows the preview', async ({ page }) => {
    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByTestId('markdown-preview')).toBeVisible();
  });

  test('opens the notes graph', async ({ page }) => {
    await page.getByLabel('Notes graph').click();
    await expect(page.getByRole('heading', { name: 'Graph' })).toBeVisible();
    await page.getByLabel('Close graph').click();
    await expect(page.getByRole('heading', { name: 'Graph' })).toBeHidden();
  });

  test('creates a new note from the sidebar', async ({ page }) => {
    await page.getByLabel('New note').first().click();
    await expect(page.getByRole('heading', { name: 'Untitled' })).toBeVisible();
  });
});