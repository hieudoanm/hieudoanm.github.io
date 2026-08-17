import { test, expect } from '@playwright/test';

test.describe('Heyawake', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/heyawake/');
  });

  test('page loads with back button', async ({ page }) => {
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('page loads with grid', async ({ page }) => {
    const grid = page.locator('[style*="grid-template-columns"] > div');
    await expect(grid.first()).toBeVisible();
    const count = await grid.count();
    expect(count).toBeGreaterThan(0);
  });

  test('control buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Undo' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Auto Solve' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Game' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'How to Play' })
    ).toBeVisible();
  });

  test('back button returns to home', async ({ page }) => {
    await page.getByText('← Back').click();
    await expect(page).toHaveURL('/');
  });
});
