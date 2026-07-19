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

const waitForBoards = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await expect(page.locator('h2:has-text("All Boards")')).toBeVisible();
};

test('loads successfully', async ({ page }) => {
  await waitForBoards(page);
  await expect(page).toHaveTitle(/Projects/);
});

test('displays projects heading', async ({ page }) => {
  await waitForBoards(page);
  await expect(page.locator('h1:has-text("Projects")')).toBeVisible();
});

test('has New Board button', async ({ page }) => {
  await waitForBoards(page);
  await expect(page.locator('button:has-text("New Board")')).toBeVisible();
});

test('displays All Boards section', async ({ page }) => {
  await waitForBoards(page);
  await expect(page.locator('h2:has-text("All Boards")')).toBeVisible();
});

test('displays existing boards', async ({ page }) => {
  await waitForBoards(page);
  await expect(page.locator('text=Project Alpha')).toBeVisible();
});

test('opens create board modal on click', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await expect(page.locator('h2:has-text("New Board")')).toBeVisible();
  await expect(page.locator('input[placeholder="Board name"]')).toBeVisible();
});

test('create board modal has color options', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  const colorButtons = page.locator(
    'button.rounded-full[style*="background-color"]'
  );
  await expect(colorButtons.first()).toBeVisible();
});

test('create board modal has cancel button', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
});

test('create board modal has create button', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await expect(page.locator('button:has-text("Create")')).toBeVisible();
});

test('can create a board', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await page.locator('input[placeholder="Board name"]').fill('Test Board');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=Test Board')).toBeVisible();
  await expect(page.locator('text=Board created')).toBeVisible();
});

test('can cancel board creation', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await page.locator('button:has-text("Cancel")').click();
  await expect(page.locator('h2:has-text("New Board")')).not.toBeVisible();
});

test('can select a color for new board', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  const colorBtn = page
    .locator('button.rounded-full[style*="background-color"]')
    .nth(2);
  await colorBtn.click();
});

test('board cards show list and card counts', async ({ page }) => {
  await waitForBoards(page);
  await expect(page.locator('text=/\\d+ lists/').first()).toBeVisible();
  await expect(page.locator('text=/\\d+ cards/').first()).toBeVisible();
});

test('can click board to navigate', async ({ page }) => {
  await waitForBoards(page);
  await page
    .getByRole('link', { name: /lists.*cards/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/board/);
});

test('has star toggle on boards', async ({ page }) => {
  await waitForBoards(page);
  const starBtn = page.locator('button.btn-ghost.btn-xs.btn-circle').first();
  await expect(starBtn).toBeVisible();
});

test('has delete button on boards', async ({ page }) => {
  await waitForBoards(page);
  const deleteBtn = page
    .locator('button.btn-ghost.btn-xs.btn-circle.text-error')
    .first();
  await expect(deleteBtn).toBeVisible();
});

test('can delete board', async ({ page }) => {
  await waitForBoards(page);
  await page.locator('button:has-text("New Board")').click();
  await page.locator('input[placeholder="Board name"]').fill('To Delete');
  await page.locator('button:has-text("Create")').click();
  await expect(page.locator('text=To Delete')).toBeVisible();
  const allBoards = page.locator('section').filter({ hasText: 'All Boards' });
  await allBoards.locator('button.text-error').first().click();
  await expect(page.locator('text=Board deleted')).toBeVisible();
});

test('captures marketing screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'home.png'),
  });
});
