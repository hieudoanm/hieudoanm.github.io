import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Tourney', { timeout: 10000 });
    await page.waitForSelector('[href*="/tournament?id="]', { timeout: 10000 });
  });

  test('displays tournament list', async ({ page }) => {
    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(6);
  });

  test('search filters tournaments', async ({ page }) => {
    const input = page.locator('input[placeholder="Search tournaments..."]');
    await input.fill('FA Cup');

    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('FA Cup');
  });

  test('status filter shows matching tournaments', async ({ page }) => {
    await page.getByRole('button', { name: 'Completed' }).click();

    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(3);
  });

  test('search combined with filter', async ({ page }) => {
    await page.getByRole('button', { name: 'In Progress' }).click();

    const input = page.locator('input[placeholder="Search tournaments..."]');
    await input.fill('Premier');

    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Premier League');
  });

  test('clone via context menu', async ({ page }) => {
    const card = page.locator('[href*="/tournament?id="]').first();
    await card.click({ button: 'right' });

    const cloneBtn = page.getByRole('button', { name: 'Clone' });
    await expect(cloneBtn).toBeVisible();
    await cloneBtn.click();

    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(7);
  });

  test('delete via context menu', async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());

    const card = page.locator('[href*="/tournament?id="]').first();
    await card.click({ button: 'right' });

    const deleteBtn = page.getByRole('button', { name: 'Delete' });
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    const cards = page.locator('[href*="/tournament?id="]');
    await expect(cards).toHaveCount(5);
  });

  test('context menu closes on Escape', async ({ page }) => {
    const card = page.locator('[href*="/tournament?id="]').first();
    await card.click({ button: 'right' });

    await expect(page.getByRole('button', { name: 'Clone' })).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('button', { name: 'Clone' })).not.toBeVisible();
  });

  test('create button is visible', async ({ page }) => {
    const createBtn = page.locator('header a', { hasText: 'Create' });
    await expect(createBtn).toBeVisible();
  });

  test('empty state after filtering all out', async ({ page }) => {
    const input = page.locator('input[placeholder="Search tournaments..."]');
    await input.fill('zzz-nonexistent-zzz');

    await expect(page.getByText('No tournaments yet')).toBeVisible();
  });
});
