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

test.describe('Profile Page', () => {
  test('loads profile page', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
  });

  test('has back button', async ({ page }) => {
    await page.goto('/profile');
    await expect(
      page.locator('header button.btn-circle').first()
    ).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/profile');
    await page.locator('header button.btn-circle').first().click();
    await expect(page).toHaveURL('/');
  });

  test('displays User Information section', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=User Information')).toBeVisible();
  });

  test('displays Display Name input', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Display Name')).toBeVisible();
  });

  test('displays Email input', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Email')).toBeVisible();
  });

  test('displays Avatar URL input', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Avatar URL')).toBeVisible();
  });

  test('displays Display Preferences section', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Display Preferences')).toBeVisible();
  });

  test('displays Show timestamps checkbox', async ({ page }) => {
    await page.goto('/profile');
    await expect(
      page.locator('text=Show timestamps on messages')
    ).toBeVisible();
  });

  test('displays Show model badges checkbox', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Show model badges')).toBeVisible();
  });

  test('displays Compact mode checkbox', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Compact mode')).toBeVisible();
  });

  test('Save Profile button is visible', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('button:has-text("Save Profile")')).toBeVisible();
  });

  test('can edit display name', async ({ page }) => {
    await page.goto('/profile');
    const displayNameInput = page.locator('input').nth(1);
    await displayNameInput.clear();
    await displayNameInput.fill('TestUser');
    await expect(displayNameInput).toHaveValue('TestUser');
  });

  test('can edit email', async ({ page }) => {
    await page.goto('/profile');
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('can toggle checkboxes', async ({ page }) => {
    await page.goto('/profile');
    const compactCheckbox = page.locator('input[type="checkbox"]').last();
    await compactCheckbox.check();
    await expect(compactCheckbox).toBeChecked();
  });

  test('save profile shows success toast', async ({ page }) => {
    await page.goto('/profile');
    await page.locator('button:has-text("Save Profile")').click();
    await expect(page.locator('text=Profile saved')).toBeVisible();
  });
});
