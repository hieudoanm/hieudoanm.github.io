import { test, expect } from '@playwright/test';

test('lists posts and opens a post page with a diagram', async ({ page }) => {
  await page.goto('/posts/');

  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();
  await expect(page.getByText(/Showing 1–12 of 128 posts/)).toBeVisible();
  await page.getByLabel('Search posts').fill('uber');
  await page.getByRole('link', { name: /Uber — Ride Hailing/ }).click();

  await expect(
    page.getByRole('heading', { name: 'Uber — Ride Hailing' })
  ).toBeVisible();
  await expect(page.getByText(/Hieu Doan · easy · travel/)).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Interview Questions' })
  ).toBeVisible();
  await expect(page.getByLabel('Diagram canvas')).toBeVisible();
});

test('editor toolbar links to the posts library', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Posts' }).click();
  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();
});

test('searches posts and filters them by tag', async ({ page }) => {
  await page.goto('/posts/');

  const search = page.getByLabel('Search posts');
  await search.fill('netflix');
  await expect(
    page.getByRole('link', { name: /Netflix — Streaming/ })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Uber — Ride Hailing/ })
  ).toHaveCount(0);

  await search.fill('');
  await page.getByRole('button', { name: 'cdn' }).click();
  await expect(
    page.getByRole('link', { name: /Content Delivery Network/ })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Uber — Ride Hailing/ })
  ).toHaveCount(0);

  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByText(/Showing 1–12 of 128 posts/)).toBeVisible();
});
