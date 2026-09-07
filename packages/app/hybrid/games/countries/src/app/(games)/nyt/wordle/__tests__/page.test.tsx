import { render, screen } from '@testing-library/react';
import WordlePage from '../page';

jest.mock('@/games/nyt-wordle', () => ({
  Wordle: () => <div data-testid="wordle-mock" />,
}));

describe('WordlePage', () => {
  it('renders the wordle game', () => {
    render(<WordlePage />);
    expect(screen.getByTestId('wordle-mock')).toBeInTheDocument();
  });
});
