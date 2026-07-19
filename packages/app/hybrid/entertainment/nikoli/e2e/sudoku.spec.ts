import { test, expect } from '@playwright/test';

test.describe('Sudoku', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sudoku/');
  });

  test('page loads with back button', async ({ page }) => {
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('page loads with 9x9 grid', async ({ page }) => {
    const cells = page.locator(
      '[style*="grid-template-columns: repeat(9"] > div'
    );
    await expect(cells).toHaveCount(81);
  });

  test('control buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'New Game' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'How to Play' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hint' })).toBeVisible();
  });

  test('difficulty buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Easy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hard' })).toBeVisible();
  });

  test('How to Play opens instructions modal', async ({ page }) => {
    await page.getByRole('button', { name: 'How to Play' }).click();
    await expect(page.getByText('Sudoku')).toBeVisible();
    await expect(page.getByText('Got it!')).toBeVisible();

    await page.getByRole('button', { name: 'Got it!' }).click();
    await expect(page.getByText('Got it!')).not.toBeVisible();
  });

  test('New Game generates a fresh puzzle', async ({ page }) => {
    const grid = page.locator(
      '[style*="grid-template-columns: repeat(9"] > div'
    );
    const initialTexts = await grid.allTextContents();

    await page.getByRole('button', { name: 'New Game' }).click();
    const newTexts = await grid.allTextContents();

    expect(newTexts).not.toEqual(initialTexts);
  });

  test('back button returns to home', async ({ page }) => {
    await page.getByText('← Back').click();
    await expect(page).toHaveURL('/');
  });
});
