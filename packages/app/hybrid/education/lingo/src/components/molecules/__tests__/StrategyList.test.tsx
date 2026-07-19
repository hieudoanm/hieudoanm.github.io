import { render, screen } from '@testing-library/react';
import { STRATEGIES } from '@/games/economics/prisoners-dilemma/constants';
import { StrategyList } from '../StrategyList';

describe('StrategyList', () => {
  it('renders every bot with its strategy description', () => {
    render(<StrategyList />);
    expect(screen.getByRole('heading', { name: 'Bots' })).toBeInTheDocument();
    STRATEGIES.forEach(({ id, label, description }) => {
      expect(screen.getByTestId(`strategy-${id}`)).toHaveTextContent(label);
      expect(screen.getByTestId(`strategy-${id}`)).toHaveTextContent(
        description
      );
    });
  });

  it('renders only the passed subset of strategies', () => {
    render(<StrategyList strategies={[STRATEGIES[0]]} />);
    expect(screen.getAllByTestId(/^strategy-/)).toHaveLength(1);
  });
});
