import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('renders login form', async ({ page }) => {
    await page.goto('/login');
    await expect(
      page.getByRole('heading', { name: 'Welcome Back' })
    ).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('form submits and navigates to home', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/, Alex$/)).toBeVisible();
  });

  test('sign up link navigates to register', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL(/\/register/);
    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });

  test('social buttons are visible', async ({ page }) => {
    await page.goto('/login');
    await expect(
      page.getByRole('button', { name: 'Continue with Google' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Continue with Apple' })
    ).toBeVisible();
  });
});

test.describe('Register page', () => {
  test('renders register form', async ({ page }) => {
    await page.goto('/register');
    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
    await expect(page.getByPlaceholder('Full Name')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Create Account' })
    ).toBeVisible();
  });

  test('submit button disabled until terms agreed', async ({ page }) => {
    await page.goto('/register');
    const submitButton = page.getByRole('button', { name: 'Create Account' });
    await expect(submitButton).toBeDisabled();

    await page.getByPlaceholder('Full Name').fill('John Doe');
    await page.getByPlaceholder('Email').fill('john@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await expect(submitButton).toBeDisabled();

    await page.getByRole('checkbox').check();
    await expect(submitButton).toBeEnabled();
  });

  test('form submits and navigates to home', async ({ page }) => {
    await page.goto('/register');
    await page.getByPlaceholder('Full Name').fill('John Doe');
    await page.getByPlaceholder('Email').fill('john@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/, Alex$/)).toBeVisible();
  });

  test('sign in link navigates to login', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole('heading', { name: 'Welcome Back' })
    ).toBeVisible();
  });
});
