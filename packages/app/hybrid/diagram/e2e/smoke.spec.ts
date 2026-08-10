import { test, expect } from '@playwright/test';

const canvas = (page: import('@playwright/test').Page) =>
  page.getByLabel('Diagram canvas');

test('renders the default diagram', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByLabel('Diagram source')).toBeVisible();
  await expect(canvas(page)).toBeVisible();
  await expect(page.getByLabel('Node count')).toHaveText('6 nodes');
  await expect(page.getByLabel('Edge count')).toHaveText('8 edges');
});

test('re-renders the canvas when the source text changes', async ({ page }) => {
  await page.goto('/');

  const editor = page.getByLabel('Diagram source');
  await editor.fill(
    'title: Demo\nnode a: Alpha\nnode b: Beta\nedge a -> b: go'
  );
  await expect(canvas(page).getByText('Demo')).toBeVisible();
  await expect(canvas(page).getByText('Alpha')).toBeVisible();
  await expect(canvas(page).getByText('Beta')).toBeVisible();
  await expect(canvas(page).getByText('go')).toBeVisible();
  await expect(page.getByLabel('Node count')).toHaveText('2 nodes');
});

test('shows parse errors for invalid lines', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Diagram source').fill('this is not a diagram line');
  await expect(page.getByText('Parse errors')).toBeVisible();
  await expect(page.getByLabel('Node count')).toHaveText('0 nodes');
});

test('zooms the canvas in and out', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.getByText('125%')).toBeVisible();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await expect(page.getByText('100%')).toBeVisible();
});

test('renders node icons on the canvas', async ({ page }) => {
  await page.goto('/');

  const editor = page.getByLabel('Diagram source');
  await editor.fill(
    'node db: PostgreSQL [cylinder, icon=database]\nnode api: API Server [icon=server]'
  );
  const icon = canvas(page).locator('svg[data-icon="database"]');
  await expect(icon).toBeVisible();
  await expect(canvas(page).locator('svg[data-icon="server"]')).toBeVisible();
});

test('loads a built-in example diagram from the examples modal', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Browse examples' }).click();
  await page.getByLabel('Search examples').fill('netflix');
  await page.getByRole('button', { name: /Netflix/ }).click();
  await expect(page.getByLabel('Diagram source')).toHaveValue(
    /title: Netflix Streaming/
  );
  await expect(canvas(page).getByText('Encoding Pipeline')).toBeVisible();
  await expect(page.getByLabel('Node count')).toHaveText('13 nodes');
  await expect(page.getByLabel('Example diagrams')).toHaveCount(0);
});
