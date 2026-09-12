import { render, screen } from '@testing-library/react';
import GeographyPage from '../page';

describe('GeographyPage', () => {
  it('renders a hub linking to all geography games', () => {
    render(<GeographyPage />);
    expect(
      screen.getByRole('heading', { name: 'Geography games' })
    ).toBeInTheDocument();

    const games = [
      ['guess', 'Guess the Country', '/geography/guess'],
      ['higher-or-lower', 'Higher or Lower', '/geography/higher-or-lower'],
      ['wordle', 'Country Wordle', '/geography/wordle'],
      ['connections', 'Country Connections', '/geography/connections'],
      ['sort-continents', 'Sort by Continent', '/geography/sort-continents'],
    ] as const;

    for (const [testId, label, href] of games) {
      const card = screen.getByTestId(`geography-${testId}`);
      expect(card).toHaveTextContent(label);
      expect(card.getAttribute('href')).toContain(href);
    }
  });
});
