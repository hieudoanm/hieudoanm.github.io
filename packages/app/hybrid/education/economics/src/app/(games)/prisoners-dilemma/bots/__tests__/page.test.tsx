import { fireEvent, render, screen } from '@testing-library/react';
import BotsPage from '@/app/(games)/prisoners-dilemma/bots/page';
import { STRATEGIES } from '@/games/prisoners-dilemma/constants';

describe('BotsPage', () => {
  it('lists every bot with a strategy and a link back to the game', () => {
    render(<BotsPage />);
    expect(screen.getByRole('heading', { name: 'Bots' })).toBeInTheDocument();
    expect(screen.getAllByTestId(/^strategy-/)).toHaveLength(STRATEGIES.length);
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/prisoners-dilemma');
  });

  it('filters bots by search query', () => {
    render(<BotsPage />);
    fireEvent.change(screen.getByTestId('bots-search'), {
      target: { value: 'pavlov' },
    });
    expect(screen.getAllByTestId(/^strategy-/)).toHaveLength(2);
    expect(screen.getByTestId('strategy-pavlov')).toBeInTheDocument();
    expect(screen.getByTestId('strategy-bandit')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('bots-search'), {
      target: { value: 'zzzz-not-a-bot' },
    });
    expect(screen.queryAllByTestId(/^strategy-/)).toHaveLength(0);
    expect(screen.getByText(/No bots match your search/)).toBeInTheDocument();
  });
});
