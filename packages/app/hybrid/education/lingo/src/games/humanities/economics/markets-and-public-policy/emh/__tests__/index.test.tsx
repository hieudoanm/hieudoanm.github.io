import { fireEvent, render, screen } from '@testing-library/react';
import { EmhGame } from '../index';
import { TIPS } from '../constants';
import type { Position } from '../types';

const playRounds = (positions: Position[]) => {
  for (const position of positions) {
    fireEvent.click(
      screen.getByTestId(position === 'in' ? 'position-in' : 'position-cash')
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Next Round|See Results/ })
    );
  }
};

describe('EmhGame', () => {
  it('renders the round-one chooser with the public expert tip', () => {
    render(<EmhGame />);
    expect(screen.getByTestId('position-chooser')).toBeInTheDocument();
    expect(
      screen.getByText(/Prices are expected to fall or stay flat/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Invest (in)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Stay in cash' })
    ).toBeInTheDocument();
  });

  it('reveals the return after choosing to invest', () => {
    render(<EmhGame />);
    fireEvent.click(screen.getByTestId('position-in'));
    expect(screen.getByTestId('round-result')).toBeInTheDocument();
    expect(screen.getByText('▲ +3%')).toBeInTheDocument();
    expect(screen.getByText('Invested')).toBeInTheDocument();
    expect(screen.getByText('$1030.00')).toBeInTheDocument();
  });

  it('keeps the portfolio flat when staying in cash', () => {
    render(<EmhGame />);
    fireEvent.click(screen.getByTestId('position-cash'));
    expect(screen.getByText('Cash')).toBeInTheDocument();
    expect(screen.getByText(/Portfolio value:/)).toBeInTheDocument();
  });

  it('flags the expert tip as wrong when the market moves against it', () => {
    render(<EmhGame />);
    fireEvent.click(screen.getByTestId('position-in'));
    expect(screen.getByText('wrong')).toBeInTheDocument();
  });

  it('shows a neutral verdict on a flat return', () => {
    render(<EmhGame />);
    playRounds(Array.from({ length: 8 }, (): Position => 'in'));
    fireEvent.click(screen.getByTestId('position-in'));
    expect(screen.getByText('— 0%')).toBeInTheDocument();
    expect(screen.getByText('neutral')).toBeInTheDocument();
  });

  it('reaches the wealth comparison after ten rounds of following the tips', () => {
    render(<EmhGame />);
    playRounds(TIPS.map((tip) => (tip >= 1 ? 'in' : 'cash')));
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByText('Final wealth comparison')).toBeInTheDocument();
    expect(screen.getByText('Buy & hold')).toBeInTheDocument();
    expect(screen.getByText('Coin flip (50/50)')).toBeInTheDocument();
    expect(screen.getByText('Follow the expert tips')).toBeInTheDocument();
    expect(screen.getAllByText('$977.14').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Done in 10 rounds/)).toBeInTheDocument();
  });

  it('restarts the game from the final summary', () => {
    render(<EmhGame />);
    playRounds(TIPS.map((tip) => (tip >= 1 ? 'in' : 'cash')));
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('position-chooser')).toBeInTheDocument();
    expect(screen.getByText('Round 1 / 10')).toBeInTheDocument();
  });
});
