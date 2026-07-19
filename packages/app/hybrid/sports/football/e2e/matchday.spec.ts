import { Page, test, expect } from '@playwright/test';

const openTab = async (page: Page, label: string): Promise<void> => {
  await page.getByRole('tab', { name: label }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test.describe('Matchday', () => {
  test('starts the clock, scores, and records events', async ({ page }) => {
    await page.getByRole('button', { name: 'Start match clock' }).click();
    await expect(
      page.getByRole('button', { name: 'Pause match clock' })
    ).toBeVisible();

    await page.getByLabel('Increase goals for').click();
    await expect(page.getByLabel('Goals for', { exact: true })).toHaveText('1');
    await expect(page.getByTestId('match-events')).toContainText('Goal');

    await page.getByLabel('Record yellow card').click();
    await expect(page.getByTestId('match-events')).toContainText('Yellow card');

    await page.getByRole('button', { name: 'Pause match clock' }).click();
    await expect(
      page.getByRole('button', { name: 'Start match clock' })
    ).toBeVisible();
  });

  test('tracks added time and substitutions', async ({ page }) => {
    await page.getByLabel('Increase added time').click();
    await expect(page.getByLabel('Added time', { exact: true })).toHaveText(
      '1 min'
    );

    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByLabel('Player role').selectOption('FWD');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Player name').fill('Bob');
    await page.getByLabel('Shirt number').fill('7');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Bench Bob').click();
    await page.getByLabel('Position ST 9').click();
    await openTab(page, 'Position');
    await page.getByRole('button', { name: 'Bring on Bob' }).click();

    await openTab(page, 'Overview');
    await expect(
      page.getByLabel('Substitutions used', { exact: true })
    ).toHaveText('Subs 1/5');
    await expect(page.getByTestId('match-events')).toContainText(
      'Substitution'
    );
  });
});
