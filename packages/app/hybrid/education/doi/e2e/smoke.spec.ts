import { expect, test } from '@playwright/test';

test('renders home page and navigates to about', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Citation Graph' })
  ).toBeVisible();

  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: 'DOI' })).toBeVisible();
});

test('overview loads database-driven stats', async ({ page }) => {
  await page.goto('/overview');
  await expect(page.getByTestId('overview-stats')).toBeVisible({
    timeout: 15000,
  });
  await expect(page.getByText('Total works', { exact: true })).toBeVisible();
});

test('graph page renders the citation network', async ({ page }) => {
  await page.goto('/graph');
  await expect(page.getByTestId('citation-graph')).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator('#nodes circle').first()).toBeVisible();
});

test('search filters results across fields', async ({ page }) => {
  await page.goto('/search');
  const input = page.getByRole('textbox', { name: 'Search works' });
  await input.fill('thermal');
  await expect(page.getByTestId('search-results')).toBeVisible({
    timeout: 15000,
  });
  await expect(
    page.getByTestId('search-results').locator('li').first()
  ).toBeVisible();
});
