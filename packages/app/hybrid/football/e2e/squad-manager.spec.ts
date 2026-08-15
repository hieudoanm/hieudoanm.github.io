import { Page, test, expect } from '@playwright/test';

const openTab = async (page: Page, label: string): Promise<void> => {
  await page.getByRole('tab', { name: label }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test.describe('Squad Manager', () => {
  test('loads with the default formation', async ({ page }) => {
    await expect(page).toHaveTitle(/Football Squad Manager/);
    await expect(page.locator('h1')).toHaveText('Football Squad Manager');
    await expect(page.getByText('11-a-side · 4-4-2')).toBeVisible();
  });

  test('renders all pitch positions', async ({ page }) => {
    await expect(page.getByLabel('Position GK 1')).toBeVisible();
    await expect(page.getByLabel('Position ST 9')).toBeVisible();
    await expect(page.getByLabel('Position ST 10')).toBeVisible();
  });

  test('prompts to pick a position before showing the picker', async ({
    page,
  }) => {
    await openTab(page, 'Position');
    await expect(
      page.getByText('Select a position on the pitch')
    ).toBeVisible();
  });

  test('selecting a position shows the player picker', async ({ page }) => {
    await page.getByLabel('Position GK 1').click();
    await expect(page.getByText('shirt #1').first()).toBeVisible();
  });

  test('adds and assigns a player to a position', async ({ page }) => {
    await page.getByLabel('Position ST 9').click();
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();
    await openTab(page, 'Position');
    await expect(page.getByLabel('Assign Ada')).toBeVisible();
    await page.getByLabel('Assign Ada').check();
    await expect(page.getByLabel('Position ST 9')).toContainText('Ada');
  });

  test('auto-places a new player into a matching empty position', async ({
    page,
  }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Alisson');
    await page.getByLabel('Shirt number').fill('1');
    await page.getByLabel('Player role').selectOption('GK');
    await page.getByRole('button', { name: 'Add player' }).click();
    await expect(page.getByLabel('Position GK 1')).toContainText('Alisson');
  });

  test('persists the squad across reloads', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();
    await page.reload();
    await openTab(page, 'Roster');
    await expect(page.getByText('Ada').first()).toBeVisible();
  });

  test('switches formation sizes', async ({ page }) => {
    await page.getByLabel('7 players').click();
    await expect(page.getByText('7-a-side · 3-2-1')).toBeVisible();
    await page.getByLabel('5 players').click();
    await expect(page.getByText('5-a-side · 2-2')).toBeVisible();
  });

  test('groups 11-a-side formations by defensive line', async ({ page }) => {
    const select = page.getByLabel('Formation');
    await expect(select.locator('optgroup[label="Back 4"]')).toContainText(
      '4-4-2'
    );
    await expect(select.locator('optgroup[label="Back 3"]')).toContainText(
      '3-5-2'
    );
    await expect(select.locator('optgroup[label="Back 5"]')).toContainText(
      '5-3-2'
    );
  });

  test('loads the example squad onto the pitch', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Load example squad').click();
    await expect(page.getByText('11-a-side · 4-3-3')).toBeVisible();
    await expect(page.getByLabel('Position GK 1')).toContainText('Alisson');
    await expect(page.getByLabel('Position ST 9')).toContainText('Firmino');
  });

  test('loads a selected example squad onto the pitch', async ({ page }) => {
    await openTab(page, 'Roster');
    await page
      .getByLabel('Example squad to load')
      .selectOption('barcelona-2008-2009');
    await page.getByLabel('Load example squad').click();
    await expect(page.getByText('11-a-side · 4-3-3')).toBeVisible();
    await expect(page.getByLabel('Position RW 7')).toContainText('Messi');
    await expect(page.getByLabel('Position ST 9')).toContainText("Eto'o");
    await expect(page.getByLabel('Position GK 1')).toContainText('Valdés');
  });

  test('swaps players between two positions from the picker', async ({
    page,
  }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();
    await page.getByLabel('Position ST 9').click();
    await openTab(page, 'Position');
    await page.getByLabel('Assign Ada').check();
    await expect(page.getByLabel('Position ST 9')).toContainText('Ada');

    await page
      .getByLabel('Swap with position')
      .selectOption({ label: 'ST #10' });
    await page.getByRole('button', { name: 'Swap' }).click();
    await expect(page.getByLabel('Position ST 9')).not.toContainText('Ada');
    await expect(page.getByLabel('Position ST 10')).toContainText('Ada');
  });

  test('exports and imports a squad as JSON', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();

    const download = page.waitForEvent('download');
    await openTab(page, 'Export');
    await page.getByLabel('Export squad as JSON').click();
    const artifact = await download;
    expect(artifact.suggestedFilename()).toBe('my-squad.json');

    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Imported');
    await page.getByLabel('Shirt number').fill('9');
    await page.getByRole('button', { name: 'Add player' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await openTab(page, 'Export');
    await page.getByLabel('Import squad from JSON').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'my-squad.json',
      mimeType: 'application/json',
      buffer: Buffer.from(
        JSON.stringify({
          id: 'imported',
          name: 'Imported Squad',
          formationId: '433',
          players: [
            { id: 'p-imported', name: 'Imported', number: 9, role: 'FWD' },
          ],
          assignments: { '433-3-9': ['p-imported'] },
        })
      ),
    });
    await expect(page.getByText('Imported squad.')).toBeVisible();
    await expect(page.getByLabel('Position ST 9')).toContainText('Imported');
  });

  test('edits a player in the roster', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Edit Ada').click();
    await page.getByLabel('Edit player name').fill('Ada L.');
    await page.getByLabel('Edit shirt number').fill('11');
    await page.getByLabel('Edit player role').selectOption('FWD');
    await page.getByRole('button', { name: 'Save player' }).click();

    await expect(page.getByText('Ada L.').first()).toBeVisible();
    await expect(page.getByText('Ada', { exact: true })).toHaveCount(0);
  });

  test('warns about duplicate shirt numbers', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Player name').fill('Bob');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();

    await expect(
      page.getByText(/Shirt number 10 is already used by Ada/)
    ).toBeVisible();
    await expect(page.getByText('Bob')).toHaveCount(0);
  });

  test('assigns a preferred position to a player', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByLabel('Player role').selectOption('DEF');
    await page.getByLabel('Preferred position').selectOption('ST');
    await page.getByRole('button', { name: 'Add player' }).click();

    await expect(page.getByLabel('Position ST 9')).toContainText('Ada');
  });

  test('searches and sorts the roster', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();
    await page.getByLabel('Player name').fill('Bob');
    await page.getByLabel('Shirt number').fill('1');
    await page.getByLabel('Player role').selectOption('GK');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Search players').fill('Bob');
    const roster = page.getByRole('tabpanel', { name: 'Roster' }).locator('ul');
    await expect(roster.getByText('Bob')).toBeVisible();
    await expect(roster.getByText('Ada', { exact: true })).toHaveCount(0);

    await page.getByLabel('Search players').fill('');
    await page.getByLabel('Sort players').selectOption('number');
    await expect(roster.first().getByText('Bob')).toBeVisible();
  });

  test('edits player notes', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Edit Ada').click();
    await page.getByLabel('Edit player notes').fill('Fit for Sunday');
    await page.getByRole('button', { name: 'Save player' }).click();

    await expect(page.getByText('Fit for Sunday')).toBeVisible();
  });

  test('assigns a captain and vice-captain', async ({ page }) => {
    await openTab(page, 'Roster');
    await page.getByLabel('Player name').fill('Ada');
    await page.getByLabel('Shirt number').fill('10');
    await page.getByRole('button', { name: 'Add player' }).click();
    await page.getByLabel('Player name').fill('Bob');
    await page.getByLabel('Shirt number').fill('1');
    await page.getByRole('button', { name: 'Add player' }).click();

    await page.getByLabel('Make Ada captain').click();
    await page.getByLabel('Make Bob vice-captain').click();

    await expect(page.getByLabel('Clear Ada captain')).toBeVisible();
    await expect(page.getByLabel('Clear Bob vice-captain')).toBeVisible();
  });
});
