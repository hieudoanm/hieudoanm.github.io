import { Page, expect, test } from '@playwright/test';

const SNAPSHOT_OPTS = {
  maxDiffPixelRatio: 0.02,
  animations: 'disabled',
  caret: 'hide',
} as const;

const openTab = async (page: Page, label: string): Promise<void> => {
  await page.getByRole('tab', { name: label }).click();
};

const SEED_LIBRARY = {
  activeId: 'squad-visual',
  squads: [
    {
      id: 'squad-visual',
      name: 'My Squad',
      formationId: '442',
      players: [
        { id: 'p1', name: 'Alisson', number: 1, role: 'GK', position: 'GK' },
        { id: 'p2', name: 'Trent', number: 2, role: 'DEF', position: 'RB' },
        { id: 'p3', name: 'Virgil', number: 4, role: 'DEF', position: 'CB' },
        { id: 'p4', name: 'Ibrahima', number: 5, role: 'DEF', position: 'CB' },
        { id: 'p5', name: 'Andy', number: 26, role: 'DEF', position: 'LB' },
        { id: 'p6', name: 'Mohamed', number: 11, role: 'FWD', position: 'RM' },
        { id: 'p7', name: 'Dominik', number: 10, role: 'MID', position: 'CM' },
        { id: 'p8', name: 'Alexis', number: 8, role: 'MID', position: 'CM' },
        { id: 'p9', name: 'Luis', number: 7, role: 'FWD', position: 'LM' },
        { id: 'p10', name: 'Darwin', number: 9, role: 'FWD', position: 'ST' },
        { id: 'p11', name: 'Cody', number: 18, role: 'FWD', position: 'ST' },
        { id: 'p12', name: 'Curtis', number: 17, role: 'MID', bench: true },
        { id: 'p13', name: 'Joe', number: 21, role: 'DEF', bench: true },
      ],
      assignments: {
        '442-0-0': ['p1'],
        '442-1-1': ['p2'],
        '442-1-2': ['p3'],
        '442-1-3': ['p4'],
        '442-1-4': ['p5'],
        '442-2-5': ['p6'],
        '442-2-6': ['p7'],
        '442-2-7': ['p8'],
        '442-2-8': ['p9'],
        '442-3-9': ['p10'],
        '442-3-10': ['p11'],
      },
      presets: [],
      lineups: [],
      mirrored: false,
      primaryColor: '#dc2626',
    },
  ],
};

const SEED_MATCH = {
  running: false,
  elapsed: 2700,
  goalsFor: 2,
  goalsAgainst: 1,
  substitutions: 1,
  addedTime: 0,
  events: [
    { id: 'e1', minute: 12, added: 0, type: 'goal', playerName: 'Darwin' },
    {
      id: 'e2',
      minute: 34,
      added: 0,
      type: 'yellow-card',
      playerName: 'Alexis',
    },
    {
      id: 'e3',
      minute: 41,
      added: 0,
      type: 'substitution',
      playerName: 'Curtis',
    },
  ],
};

const seedState = (page: Page): Promise<unknown> =>
  page.addInitScript(
    ({ library, match }) => {
      localStorage.setItem(
        'football:squad-library:v1',
        JSON.stringify(library)
      );
      localStorage.setItem('football:match:v1', JSON.stringify(match));
    },
    { library: SEED_LIBRARY, match: SEED_MATCH }
  );

test.describe('Visual regression', () => {
  test('renders the populated overview', async ({ page }) => {
    await seedState(page);
    await page.goto('/');
    await expect(page.getByLabel('Position GK 1')).toContainText('Alisson');
    await expect(page).toHaveScreenshot(
      'overview-populated.png',
      SNAPSHOT_OPTS
    );
  });

  test('renders the roster tab', async ({ page }) => {
    await seedState(page);
    await page.goto('/');
    await openTab(page, 'Roster');
    await expect(page.getByLabel('Player name')).toBeVisible();
    await expect(page.getByText('Mohamed').first()).toBeVisible();
    await expect(page).toHaveScreenshot('roster.png', SNAPSHOT_OPTS);
  });

  test('renders the team sheet tab', async ({ page }) => {
    await seedState(page);
    await page.goto('/');
    await openTab(page, 'Team');
    await page.getByLabel('Opponent').fill('Rovers FC');
    await page.getByLabel('Match date').fill('2026-08-15');
    await expect(page.getByText('vs Rovers FC').first()).toBeVisible();
    await expect(page).toHaveScreenshot('team-sheet.png', SNAPSHOT_OPTS);
  });

  test('renders the printable team sheet', async ({ page }) => {
    await seedState(page);
    await page.goto('/');
    await openTab(page, 'Team');
    await page.getByLabel('Opponent').fill('Rovers FC');
    await page.getByLabel('Match date').fill('2026-08-15');
    await page.emulateMedia({ media: 'print' });
    await expect(
      page.locator('[data-testid="team-sheet"]:visible')
    ).toBeVisible();
    await expect(page).toHaveScreenshot('team-sheet-print.png', SNAPSHOT_OPTS);
  });

  test('renders the default empty state', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Football Manager/);
    await expect(page.getByText('11-a-side · 4-4-2')).toBeVisible();
    await expect(page).toHaveScreenshot('overview-empty.png', SNAPSHOT_OPTS);
  });
});
