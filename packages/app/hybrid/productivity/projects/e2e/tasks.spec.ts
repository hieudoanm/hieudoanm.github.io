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

const signInAs = async (
  page: import('@playwright/test').Page,
  name: string
) => {
  await page.getByLabel('Account menu').click();
  await page.getByRole('menuitem', { name: new RegExp(name) }).click();
  await expect(page.getByLabel('Account menu')).toContainText(name);
};

test('signed-in user can add, toggle, and delete tasks', async ({ page }) => {
  await openBoard(page);
  await signInAs(page, 'Alice Chen');
  await page.getByRole('button', { name: 'Tasks', exact: true }).click();

  const input = page.getByLabel('New task');
  await expect(input).toBeVisible();
  await input.fill('Ship the release');
  await page.getByLabel('Add task').click();
  await expect(page.getByText('Ship the release')).toBeVisible();
  await expect(page.getByText('1 pending · 1 total')).toBeVisible();

  await page.getByLabel('Toggle Ship the release').click();
  await expect(page.getByText('0 pending · 1 total')).toBeVisible();

  await page.getByLabel('Delete Ship the release').click();
  await expect(page.getByText('No tasks yet.')).toBeVisible();
});

test('tasks persist per signed-in member', async ({ page }) => {
  await openBoard(page);
  await signInAs(page, 'Alice Chen');
  await page.getByRole('button', { name: 'Tasks', exact: true }).click();
  await page.getByLabel('New task').fill('Alice task');
  await page.getByLabel('Add task').click();
  await expect(page.getByText('Alice task')).toBeVisible();

  await signInAs(page, 'Bob Smith');
  await expect(page.getByText('No tasks yet.')).toBeVisible();
  await page.getByLabel('New task').fill('Bob task');
  await page.getByLabel('Add task').click();
  await expect(page.getByText('Bob task')).toBeVisible();
  await expect(page.getByText('Alice task')).toHaveCount(0);

  await signInAs(page, 'Alice Chen');
  await expect(page.getByText('Alice task')).toBeVisible();
  await expect(page.getByText('Bob task')).toHaveCount(0);
});

test('signing out hides tasks on a public view', async ({ page }) => {
  await openBoard(page);
  await signInAs(page, 'Alice Chen');
  await page.getByRole('button', { name: 'Tasks', exact: true }).click();
  await page.getByLabel('New task').fill('Private');
  await page.getByLabel('Add task').click();
  await expect(page.getByText('Private')).toBeVisible();

  await page.getByLabel('Account menu').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await expect(page.getByLabel('New task')).toHaveCount(0);
  await expect(page.getByText('Private')).toHaveCount(0);
});
