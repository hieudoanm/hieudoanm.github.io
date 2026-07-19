import { test, expect } from '@playwright/test';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

const goToBoard = async (page: import('@playwright/test').Page) => {
  await page.goto('/?id=board-2');
  await expect(page.locator('h1')).toBeVisible();
};

test('loads board page on the root route', async ({ page }) => {
  await goToBoard(page);
  await expect(page).toHaveURL(/id=board-2/);
});

test('displays the selected board name in header', async ({ page }) => {
  await goToBoard(page);
  await expect(page.locator('h1')).toHaveText('Personal Tasks');
});

test('has star toggle', async ({ page }) => {
  await goToBoard(page);
  await expect(page.getByRole('button', { name: 'Toggle star' })).toBeVisible();
});

test('has archive button', async ({ page }) => {
  await goToBoard(page);
  await expect(
    page.getByRole('button', { name: 'Open archive' })
  ).toBeVisible();
});

test('has Add list button', async ({ page }) => {
  await goToBoard(page);
  await expect(page.locator('button:has-text("Add list")')).toBeVisible();
});

test('can add a new list', async ({ page }) => {
  await goToBoard(page);
  await page.locator('button:has-text("Add list")').click();
  await page.locator('input[placeholder="List name"]').fill('New List');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(page.locator('h3:has-text("New List")')).toBeVisible();
  await expect(page.locator('text=List created')).toBeVisible();
});

test('can cancel adding list', async ({ page }) => {
  await goToBoard(page);
  await page.locator('button:has-text("Add list")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(
    page.locator('input[placeholder="List name"]')
  ).not.toBeVisible();
});

test('lists have Add card button', async ({ page }) => {
  await goToBoard(page);
  await expect(
    page.locator('button:has-text("Add card")').first()
  ).toBeVisible();
});

test('can add a card to a list', async ({ page }) => {
  await goToBoard(page);
  await page.locator('button:has-text("Add card")').first().click();
  await page.locator('input[placeholder="Card title"]').fill('New Card');
  await page.locator('button.btn-primary.btn-xs').click();
  await expect(page.locator('text=New Card')).toBeVisible();
  await expect(page.locator('text=Card created')).toBeVisible();
});

test('can cancel adding card', async ({ page }) => {
  await goToBoard(page);
  await page.locator('button:has-text("Add card")').first().click();
  await page.locator('input[placeholder="Card title"]').fill('Temp');
  await page.locator('input[placeholder="Card title"]').clear();
  await page.keyboard.press('Escape');
  await expect(
    page.locator('input[placeholder="Card title"]')
  ).not.toBeVisible();
});

test('clicking card opens modal', async ({ page }) => {
  await goToBoard(page);
  const card = page.locator('.card').filter({ hasText: /./ }).first();
  await card.click();
  await expect(page.locator('input.input-ghost')).toBeVisible();
});

test('card modal has title input', async ({ page }) => {
  await goToBoard(page);
  const card = page
    .locator('.card')
    .filter({ has: page.locator('.text-xs') })
    .first();
  await card.click();
  await expect(page.locator('input.input-ghost')).toBeVisible();
});

test('card modal has description textarea', async ({ page }) => {
  await goToBoard(page);
  const card = page
    .locator('.card')
    .filter({ has: page.locator('.text-xs') })
    .first();
  await card.click();
  await expect(
    page.locator('textarea[placeholder="Add a description..."]')
  ).toBeVisible();
});

test('card modal has priority select', async ({ page }) => {
  await goToBoard(page);
  const card = page
    .locator('.card')
    .filter({ has: page.locator('.text-xs') })
    .first();
  await card.click();
  await expect(page.locator('select.select-sm')).toBeVisible();
});

test('card modal has delete button', async ({ page }) => {
  await goToBoard(page);
  const card = page
    .locator('.card')
    .filter({ has: page.locator('.text-xs') })
    .first();
  await card.click();
  await expect(page.locator('button:has-text("Delete")')).toBeVisible();
});

test('card modal has label buttons', async ({ page }) => {
  await goToBoard(page);
  const card = page
    .locator('.card')
    .filter({ has: page.locator('.text-xs') })
    .first();
  await card.click();
  await expect(page.locator('.badge').first()).toBeVisible();
});

test('sidebar lists all projects', async ({ page }) => {
  await goToBoard(page);
  const sidebar = page.getByRole('complementary');
  await expect(sidebar.getByText('Projects')).toBeVisible();
  await expect(
    sidebar.getByRole('link', { name: /Personal Tasks/ })
  ).toBeVisible();
  await expect(
    sidebar.getByRole('link', { name: /Project Alpha/ })
  ).toBeVisible();
  await expect(
    sidebar.getByRole('link', { name: /Event Planning/ })
  ).toBeVisible();
});

test('has add project button in sidebar', async ({ page }) => {
  await goToBoard(page);
  await expect(page.getByRole('button', { name: 'Add project' })).toBeVisible();
});
