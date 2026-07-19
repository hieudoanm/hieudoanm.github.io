import { fireEvent, render, screen } from '@testing-library/react';
import { Baccarat } from '../index';

describe('Baccarat', () => {
  it('renders credits and bet options', () => {
    render(<Baccarat />);
    expect(screen.getByTestId('baccarat-credits')).toHaveTextContent('200');
    expect(screen.getByTestId('baccarat-bet-player')).toBeInTheDocument();
    expect(screen.getByTestId('baccarat-bet-tie')).toBeInTheDocument();
    expect(screen.getByTestId('baccarat-deal')).toBeDisabled();
  });

  it('plays a full round', () => {
    render(<Baccarat />);
    fireEvent.click(screen.getByTestId('baccarat-bet-player'));
    fireEvent.click(screen.getByTestId('baccarat-deal'));
    expect(screen.getByTestId('baccarat-result')).toBeInTheDocument();
    expect(
      screen.getAllByTestId(/^baccarat-card-player-/).length
    ).toBeGreaterThanOrEqual(2);
    fireEvent.click(screen.getByTestId('baccarat-next'));
    expect(screen.getByTestId('baccarat-deal')).toBeInTheDocument();
  });
});
