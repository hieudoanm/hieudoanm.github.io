import { test, expect } from '@playwright/test';
import { login, waitForData } from './helpers';
import path from 'path';

test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = path.join(
    __dirname,
    'images',
    `${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test.describe('Accounts Overview', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/accounts');
  });

  test('loads accounts page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Accounts")')).toBeVisible();
  });

  test('displays total balance', async ({ page }) => {
    await expect(page.locator('text=Total Balance')).toBeVisible();
  });

  test('displays account sections', async ({ page }) => {
    await expect(page.locator('text=Checking').first()).toBeVisible();
    await expect(page.locator('text=Savings').first()).toBeVisible();
    await expect(page.locator('text=Credit').first()).toBeVisible();
  });
});

test.describe('Checking Accounts', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/accounts/checking');
  });

  test('loads checking page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Checking")')).toBeVisible();
  });

  test('has Add Checking Account button', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Add Checking Account")')
    ).toBeVisible();
  });

  test('add button opens modal', async ({ page }) => {
    await page.locator('button:has-text("Add Checking Account")').click();
    await expect(page.locator('h3:has-text("Add Account")')).toBeVisible();
  });
});

test.describe('Savings Accounts', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/accounts/savings');
  });

  test('loads savings page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Savings")')).toBeVisible();
  });

  test('has Add Savings Account button', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Add Savings Account")')
    ).toBeVisible();
  });
});

test.describe('Credit Cards', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/accounts/credit');
  });

  test('loads credit page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Credit")')).toBeVisible();
  });

  test('has Add Credit Card button', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Add Credit Card")')
    ).toBeVisible();
  });
});

test.describe('Reports', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/reports');
  });

  test('loads reports page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Reports")')).toBeVisible();
  });

  test('has tab buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("Overview")')).toBeVisible();
    await expect(page.locator('button:has-text("Spending")')).toBeVisible();
    await expect(page.locator('button:has-text("Income")')).toBeVisible();
    await expect(page.locator('button:has-text("Trends")')).toBeVisible();
  });

  test('overview shows summary cards', async ({ page }) => {
    await expect(page.locator('text=Income').first()).toBeVisible();
    await expect(page.locator('text=Expenses')).toBeVisible();
  });

  test('can switch to spending tab', async ({ page }) => {
    await page.locator('button:has-text("Spending")').click();
    await expect(page.locator('text=Category').first()).toBeVisible();
  });

  test('can switch to income tab', async ({ page }) => {
    await page.locator('button:has-text("Income")').click();
  });

  test('can switch to trends tab', async ({ page }) => {
    await page.locator('button:has-text("Trends")').click();
  });

  test('has export buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("CSV")')).toBeVisible();
    await expect(page.locator('button:has-text("PDF")')).toBeVisible();
  });
});

test.describe('Bills', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/bills');
  });

  test('loads bills page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Bills")')).toBeVisible();
  });

  test('shows total due summary', async ({ page }) => {
    await expect(page.locator('text=Total Due This Month')).toBeVisible();
  });

  test('has Add Bill button', async ({ page }) => {
    await expect(page.locator('button:has-text("Add Bill")')).toBeVisible();
  });

  test('add bill opens modal', async ({ page }) => {
    await page.locator('button:has-text("Add Bill")').click();
    await expect(page.locator('h3:has-text("Add Bill")')).toBeVisible();
  });

  test('can cancel add bill', async ({ page }) => {
    await page.locator('button:has-text("Add Bill")').click();
    await page.locator('button:has-text("Cancel")').click();
    await expect(page.locator('h3:has-text("Add Bill")')).not.toBeVisible();
  });

  test('bill items have pay toggle', async ({ page }) => {
    await expect(page.locator('button:has-text("Pay")').first()).toBeVisible();
  });
});

test.describe('Contacts', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
  });

  test('loads contacts page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Contacts")')).toBeVisible();
  });

  test('has Add Contact button', async ({ page }) => {
    await expect(page.locator('button:has-text("Add Contact")')).toBeVisible();
  });

  test('add contact shows form', async ({ page }) => {
    await page.locator('button:has-text("Add Contact")').click();
    await expect(page.getByText('New Contact')).toBeVisible();
    await expect(
      page.locator('.floating-label').filter({ hasText: 'Name' }).first()
    ).toBeVisible();
    await expect(
      page.locator('.floating-label').filter({ hasText: 'Email' }).first()
    ).toBeVisible();
  });

  test('can cancel add contact', async ({ page }) => {
    await page.locator('button:has-text("Add Contact")').click();
    await expect(page.getByText('New Contact')).toBeVisible();
    await page.locator('button:has-text("Cancel")').click();
    await expect(page.getByText('New Contact')).not.toBeVisible();
  });

  test('displays existing contacts', async ({ page }) => {
    await waitForData(page);
    const contacts = page
      .locator('[data-testid="contact-item"], .card')
      .filter({ hasText: /@/ });
    await expect(contacts.first()).toBeVisible();
  });
});

test.describe('Loans', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/loans');
  });

  test('loads loans page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Loans")')).toBeVisible();
  });

  test('displays loan stats', async ({ page }) => {
    await expect(
      page.locator('.stat-title:has-text("Total Borrowed")')
    ).toBeVisible();
    await expect(
      page.locator('.stat-title:has-text("Monthly EMI")')
    ).toBeVisible();
  });

  test('has EMI calculator', async ({ page }) => {
    await expect(page.locator('text=EMI Calculator')).toBeVisible();
  });

  test('has Apply for Loan button', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Apply for Loan")')
    ).toBeVisible();
  });

  test('emi calculator has sliders', async ({ page }) => {
    await expect(page.locator('input[type="range"]').first()).toBeVisible();
  });
});

test.describe('Payment Requests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/payment-requests');
  });

  test('loads payment requests page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Payment Requests")')).toBeVisible();
  });

  test('displays incoming requests', async ({ page }) => {
    await expect(page.locator('h2:has-text("Incoming")')).toBeVisible();
  });

  test('displays outgoing requests', async ({ page }) => {
    await expect(page.locator('h2:has-text("Outgoing")')).toBeVisible();
  });

  test('has status badges', async ({ page }) => {
    await expect(page.locator('.badge').first()).toBeVisible();
  });
});

test.describe('Split Bill', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/split-bill');
  });

  test('loads split bill page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Split Bill")')).toBeVisible();
  });

  test('has total amount input', async ({ page }) => {
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
  });
});

test.describe('Exchange Rates', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/rates');
  });

  test('loads rates page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Exchange Rates")')).toBeVisible();
  });

  test('has back to exchange link', async ({ page }) => {
    await expect(page.locator('a:has-text("Calculator")')).toBeVisible();
  });

  test('displays currency rates', async ({ page }) => {
    await expect(page.locator('text=USD')).toBeVisible();
  });
});

test.describe('Currency Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/currency-alerts');
  });

  test('loads currency alerts page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Currency Alerts")')).toBeVisible();
  });

  test('has create alert functionality', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Add Currency Alert")')
    ).toBeVisible();
  });
});

test.describe('Recurring Transfers', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/recurring-transfers');
  });

  test('loads recurring transfers page', async ({ page }) => {
    await expect(
      page.locator('h1:has-text("Recurring Transfers")')
    ).toBeVisible();
  });

  test('has New button to create transfer', async ({ page }) => {
    await expect(page.locator('button:has-text("New")')).toBeVisible();
  });
});

test.describe('Savings Goals', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/savings-goals');
  });

  test('loads savings goals page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Savings Goals")')).toBeVisible();
  });

  test('displays stats', async ({ page }) => {
    await expect(page.locator('text=Total Goals')).toBeVisible();
    await expect(page.locator('text=Total Saved').first()).toBeVisible();
  });

  test('has New Goal button', async ({ page }) => {
    await expect(page.locator('button:has-text("New Goal")')).toBeVisible();
  });

  test('new goal opens modal', async ({ page }) => {
    await page.locator('button:has-text("New Goal")').click();
    await expect(page.locator('text=New Savings Goal')).toBeVisible();
  });

  test('can cancel new goal', async ({ page }) => {
    await page.locator('button:has-text("New Goal")').click();
    await page.locator('button:has-text("Cancel")').click();
    await expect(page.locator('text=New Savings Goal')).not.toBeVisible();
  });
});

test.describe('Fixed Deposits', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/fixed-deposits');
  });

  test('loads fixed deposits page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Fixed Deposits")')).toBeVisible();
  });

  test('displays stats', async ({ page }) => {
    await expect(page.locator('text=Total Invested')).toBeVisible();
    await expect(page.locator('text=Active FDs').first()).toBeVisible();
  });

  test('has FD calculator', async ({ page }) => {
    await expect(page.locator('text=FD Calculator')).toBeVisible();
  });

  test('has FD vs RD comparison', async ({ page }) => {
    await expect(page.locator('text=FD vs RD Comparison')).toBeVisible();
  });
});

test.describe('Recurring Deposits', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/recurring-deposits');
  });

  test('loads recurring deposits page', async ({ page }) => {
    await expect(
      page.locator('h1:has-text("Recurring Deposits")')
    ).toBeVisible();
  });

  test('displays stats', async ({ page }) => {
    await expect(page.locator('text=Total Saved').first()).toBeVisible();
    await expect(page.locator('text=Active RDs').first()).toBeVisible();
  });

  test('has RD calculator', async ({ page }) => {
    await expect(page.locator('text=RD Calculator')).toBeVisible();
  });
});

test.describe('Card Rewards', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/card-rewards');
  });

  test('loads card rewards page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Card Rewards")')).toBeVisible();
  });

  test('displays stats', async ({ page }) => {
    await expect(
      page.locator('.stat-title:has-text("Total Points")').first()
    ).toBeVisible();
    await expect(
      page.locator('.stat-title:has-text("Cashback YTD")').first()
    ).toBeVisible();
  });

  test('has redeem catalog', async ({ page }) => {
    await expect(page.locator('h2:has-text("Redeem Points")')).toBeVisible();
  });

  test('redeem shows toast', async ({ page }) => {
    await page.locator('button:has-text("Redeem")').first().click();
    await expect(page.getByRole('status')).toBeVisible();
  });
});

test.describe('Insurance', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/insurance');
  });

  test('loads insurance page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Insurance")')).toBeVisible();
  });

  test('displays stats', async ({ page }) => {
    await expect(
      page.locator('.stat-title:has-text("Total Coverage")')
    ).toBeVisible();
    await expect(
      page.locator('.stat-title:has-text("Active Policies")')
    ).toBeVisible();
  });

  test('has pay premium button', async ({ page }) => {
    await expect(
      page.locator('button:has-text("Pay Premium")').first()
    ).toBeVisible();
  });

  test('has browse plans button', async ({ page }) => {
    await expect(page.locator('button:has-text("Browse Plans")')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/settings');
  });

  test('loads settings page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
  });

  test('has dark mode toggle', async ({ page }) => {
    await expect(page.locator('text=Dark Mode')).toBeVisible();
  });

  test('has push notifications toggle', async ({ page }) => {
    await expect(page.locator('text=Push Notifications')).toBeVisible();
  });

  test('has biometric login toggle', async ({ page }) => {
    await expect(page.locator('text=Biometric Login')).toBeVisible();
  });

  test('has language selector', async ({ page }) => {
    await expect(page.locator('text=Language').first()).toBeVisible();
  });

  test('has theme picker', async ({ page }) => {
    await expect(
      page.getByText('Theme', { exact: true }).first()
    ).toBeVisible();
  });

  test('has help & support link', async ({ page }) => {
    await expect(page.locator('a:has-text("Help & Support")')).toBeVisible();
  });

  test('has terms of service link', async ({ page }) => {
    await expect(page.locator('a:has-text("Terms of Service")')).toBeVisible();
  });

  test('has privacy policy link', async ({ page }) => {
    await expect(page.locator('a:has-text("Privacy Policy")')).toBeVisible();
  });

  test('can toggle dark mode', async ({ page }) => {
    const toggle = page.locator('input.toggle').first();
    await toggle.click();
    await toggle.click();
  });
});

test.describe('Help & Support', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/help-support');
  });

  test('loads help page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Help & Support")')).toBeVisible();
  });

  test('displays contact options', async ({ page }) => {
    await expect(page.locator('text=Email Support')).toBeVisible();
    await expect(page.locator('text=Live Chat')).toBeVisible();
    await expect(page.locator('text=Phone Support')).toBeVisible();
  });

  test('displays FAQs', async ({ page }) => {
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });

  test('displays resources', async ({ page }) => {
    await expect(page.locator('text=User Guide')).toBeVisible();
  });
});

test.describe('Privacy Policy', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/privacy-policy');
  });

  test('loads privacy policy page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
  });

  test('displays policy content', async ({ page }) => {
    await expect(page.locator('text=Information We Collect')).toBeVisible();
  });
});

test.describe('Terms of Service', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/terms-of-service');
  });

  test('loads terms page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Terms of Service")')).toBeVisible();
  });

  test('displays terms content', async ({ page }) => {
    await expect(page.locator('text=Acceptance').first()).toBeVisible();
  });
});

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/about');
  });

  test('loads about page', async ({ page }) => {
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('displays app name', async ({ page }) => {
    await expect(page.locator('h1:has-text("Wallet")')).toBeVisible();
  });

  test('displays app description', async ({ page }) => {
    await expect(page.locator('text=Digital wallet')).toBeVisible();
  });

  test('displays version', async ({ page }) => {
    await expect(page.locator('text=v0.0.1')).toBeVisible();
  });

  test('displays tech stack', async ({ page }) => {
    await expect(page.locator('text=Framework')).toBeVisible();
    await expect(page.locator('text=Next.js')).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await expect(page.locator('.badge:has-text("Stable")')).toBeVisible();
  });
});

test.describe('Version Page', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await login(page);
    await page.goto('/version');
  });

  test('loads version page', async ({ page }) => {
    await expect(page.locator('text=Wallet Version')).toBeVisible();
  });

  test('displays version format', async ({ page }) => {
    await expect(page.locator('text=YYYY.MM.DD.hh.mm.ss')).toBeVisible();
  });

  test('displays Stable badge', async ({ page }) => {
    await expect(page.locator('text=Stable')).toBeVisible();
  });

  test('copy version button works', async ({ page }) => {
    await page.locator('button:has-text("Copy version")').click();
    await expect(page.locator('button:has-text("Copied")')).toBeVisible();
  });
});

test.describe('Forgot Password', () => {
  test('loads forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByText('Forgot Password')).toBeVisible();
  });

  test('has email input', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('has submit button', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('button:has-text("Send")')).toBeVisible();
  });

  test('has back to login link', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('a:has-text("Sign in")')).toBeVisible();
  });
});

test.describe('Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/notifications');
  });

  test('loads notifications page', async ({ page }) => {
    await expect(page.locator('h1:has-text("Notifications")')).toBeVisible();
  });

  test('has filter buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("All")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Unread")')).toBeVisible();
    await expect(page.locator('button:has-text("Alerts")')).toBeVisible();
  });

  test('can filter to unread', async ({ page }) => {
    await page.locator('button:has-text("Unread")').click();
  });

  test('can filter to alerts', async ({ page }) => {
    await page.locator('button:has-text("Alerts")').click();
  });
});
