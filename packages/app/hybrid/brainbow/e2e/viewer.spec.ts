import { test, expect } from '@playwright/test';

test('opens the demo dataset in the viewer', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('demo-brainbow.tif')).toBeVisible();
  await expect(page.getByText('Channels')).toBeVisible();
});

test('channel toggling updates the viewer', async ({ page }) => {
  await page.goto('/');

  const blueToggle = page.getByRole('checkbox', { name: 'Blue' });
  await expect(blueToggle).toBeChecked();
  await blueToggle.click();
  await expect(blueToggle).not.toBeChecked();
});

test('zoom controls update the zoom readout', async ({ page }) => {
  await page.goto('/');

  const readout = page.locator('span.w-16');
  const initial = await readout.textContent();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(readout).not.toHaveText(initial ?? '');
});

test('fit button resets the zoom', async ({ page }) => {
  await page.goto('/');

  const readout = page.locator('span.w-16');
  await page.getByRole('button', { name: 'Zoom in' }).click();
  const zoomed = await readout.textContent();
  await page.getByRole('button', { name: 'Fit' }).click();
  await expect(readout).not.toHaveText(zoomed ?? '');
});
