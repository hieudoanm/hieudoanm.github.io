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

const openBoard = async (page: import('@playwright/test').Page) => {
  await page.goto('/?id=board-2');
  await expect(page.locator('h1')).toBeVisible();
};

test('switches to the list view from the view switcher', async ({ page }) => {
  await openBoard(page);
  await page.getByRole('button', { name: 'List', exact: true }).click();
  await expect(page.locator('thead')).toContainText('Title');
  await expect(
    page.getByRole('button', { name: 'List', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
});

test('switches to the calendar view from the view switcher', async ({
  page,
}) => {
  await openBoard(page);
  await page.getByRole('button', { name: 'Calendar', exact: true }).click();
  await expect(page.getByText('Sun').first()).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Calendar', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
});

test('switches to the timeline view from the view switcher', async ({
  page,
}) => {
  await openBoard(page);
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Timeline', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
});

test('switches to the tasks view but shows nothing when signed out', async ({
  page,
}) => {
  await openBoard(page);
  await page.getByRole('button', { name: 'Tasks', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Tasks', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('New task')).toHaveCount(0);
});

test('switches back to the kanban board', async ({ page }) => {
  await openBoard(page);
  await page.getByRole('button', { name: 'List', exact: true }).click();
  await expect(page.locator('thead')).toContainText('Title');
  await page.getByRole('button', { name: 'Kanban', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Kanban', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('h1')).toBeVisible();
});
