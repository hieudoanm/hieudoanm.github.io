import { expect, test } from '@playwright/test';

test.describe('Resume Editor', () => {
  test('updates the preview when the name changes', async ({ page }) => {
    await page.goto('/');
    const sheet = page.locator('#resume-sheet');
    await expect(sheet).toContainText('John Smith');

    const nameInput = page.getByLabel('Full name');
    await nameInput.fill('Jane Doe');
    await expect(sheet).toContainText('Jane Doe');
  });

  test('switching template updates the preview', async ({ page }) => {
    await page.goto('/');
    const sheet = page.locator('#resume-sheet');
    await page.getByRole('tab', { name: /templates/i }).click();
    await page.locator('button', { hasText: 'Modern' }).click();
    await expect(page.locator('button[aria-pressed="true"]')).toContainText(
      'Modern'
    );
    await expect(sheet).toBeVisible();
  });

  test('adds an experience item', async ({ page }) => {
    await page.goto('/');
    await page.locator('button', { hasText: 'Add experience' }).click();
    await expect(
      page.locator('button', { hasText: 'Remove' }).last()
    ).toBeVisible();
  });

  test('selects a paper size', async ({ page }) => {
    await page.goto('/');
    const select = page.getByLabel('Paper size');
    await select.selectOption('a5');
    await expect(select).toHaveValue('a5');
  });
});
