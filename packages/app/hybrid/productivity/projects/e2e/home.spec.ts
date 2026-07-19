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

const waitForBoard = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
};

test('loads successfully', async ({ page }) => {
  await waitForBoard(page);
  await expect(page).toHaveTitle(/Projects/);
});

test('displays projects heading in sidebar', async ({ page }) => {
  await waitForBoard(page);
  await expect(
    page.getByRole('complementary').getByText('Projects')
  ).toBeVisible();
});

test('displays the default board in the header', async ({ page }) => {
  await waitForBoard(page);
  await expect(page.locator('h1')).toHaveText('Project Alpha');
});

test('sidebar lists all projects', async ({ page }) => {
  await waitForBoard(page);
  await expect(page.getByRole('link', { name: /Project Alpha/ })).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Personal Tasks/ })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Event Planning/ })
  ).toBeVisible();
});

test('has add project button in sidebar', async ({ page }) => {
  await waitForBoard(page);
  await expect(page.getByRole('button', { name: 'Add project' })).toBeVisible();
});

test('opens create board modal on add project click', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  await expect(page.locator('h2:has-text("New Board")')).toBeVisible();
  await expect(page.locator('input[placeholder="Board name"]')).toBeVisible();
});

test('create board modal has color options', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  const colorButtons = page.locator(
    'button.rounded-full[style*="background-color"]'
  );
  await expect(colorButtons.first()).toBeVisible();
});

test('create board modal has cancel button', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('create board modal has create button', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  await expect(page.locator('button:has-text("Create")')).toBeVisible();
});

test('can create a board from the sidebar', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  await page.locator('input[placeholder="Board name"]').fill('Test Board');
  await page.locator('button:has-text("Create")').click();
  await expect(page.getByText('Test Board')).toBeVisible();
  await expect(page.locator('text=Board created')).toBeVisible();
});

test('can cancel board creation', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('h2:has-text("New Board")')).not.toBeVisible();
});

test('can select a color for new board', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Add project' }).click();
  const colorBtn = page
    .locator('button.rounded-full[style*="background-color"]')
    .nth(2);
  await colorBtn.click();
});

test('can delete a board from the sidebar', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('button', { name: 'Delete Event Planning' }).click();
  await expect(page.locator('text=Board deleted')).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Event Planning/ })
  ).not.toBeVisible();
});

test('can click a sidebar project to navigate', async ({ page }) => {
  await waitForBoard(page);
  await page.getByRole('link', { name: /Personal Tasks/ }).click();
  await expect(page).toHaveURL(/id=board-2/);
  await expect(page.locator('h1')).toHaveText('Personal Tasks');
});

test('has star toggle in the board header', async ({ page }) => {
  await waitForBoard(page);
  await expect(page.getByRole('button', { name: 'Toggle star' })).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
