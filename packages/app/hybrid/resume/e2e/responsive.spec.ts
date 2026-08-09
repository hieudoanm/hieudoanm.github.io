import { expect, test } from '@playwright/test';
import { devices } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('mobile stacks the editor above the preview', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByLabel('Full name')).toBeVisible();
    await expect(page.locator('#resume-sheet')).toBeVisible();
    const editorBox = await page.getByLabel('Full name').boundingBox();
    const sheetBox = await page.locator('#resume-sheet').boundingBox();
    expect(
      editorBox !== null && sheetBox !== null && editorBox.y < sheetBox.y
    ).toBe(true);
  });

  test('desktop shows both editor and preview', async ({ page }) => {
    await page.setViewportSize(devices['Desktop Chrome'].viewport);
    await page.goto('/');
    await expect(page.locator('#resume-sheet')).toBeVisible();
    await expect(
      page.locator('button', { hasText: 'Add experience' })
    ).toBeVisible();
  });
});
