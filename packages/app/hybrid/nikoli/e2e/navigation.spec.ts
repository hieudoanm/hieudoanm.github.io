import { test, expect } from '@playwright/test';

const games = [
  { name: 'Sudoku', slug: 'sudoku' },
  { name: 'Nurikabe', slug: 'nurikabe' },
  { name: 'Masyu', slug: 'masyu' },
  { name: 'Shikaku', slug: 'shikaku' },
  { name: 'Fillomino', slug: 'fillomino' },
  { name: 'Norinori', slug: 'norinori' },
  { name: 'Heyawake', slug: 'heyawake' },
];

test.describe('Navigation', () => {
  for (const game of games) {
    test(`can navigate to ${game.name} and back`, async ({ page }) => {
      await page.goto('/');
      await page.getByText(game.name, { exact: true }).click();
      await expect(page).toHaveURL(`/${game.slug}/`);

      await page.getByText('← Back').click();
      await expect(page).toHaveURL('/');
    });
  }

  test('browser back button returns to home after navigating to a game', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByText('Sudoku', { exact: true }).click();
    await expect(page).toHaveURL('/sudoku/');

    await page.goBack();
    await expect(page).toHaveURL('/');
  });

  test('browser back button works for each game', async ({ page }) => {
    for (const game of games) {
      await page.goto(`/${game.slug}/`);
      await page.goBack();
      await expect(page).toHaveURL('/');
    }
  });
});
