import { fireEvent, render, screen } from '@testing-library/react';
import { OverUnderSeven } from '../index';
import { playRound } from '../utils';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, playRound: jest.fn(actual.playRound) };
});

const { playRound: mockedPlay } = jest.requireMock('../utils') as {
  playRound: jest.Mock;
};

describe('OverUnderSeven', () => {
  it('renders bet options and a disabled roll button', () => {
    render(<OverUnderSeven />);
    expect(screen.getByTestId('dice-credits')).toHaveTextContent('200');
    expect(screen.getByTestId('dice-roll')).toBeDisabled();
    expect(screen.getByText(/Bet on under 7/)).toBeInTheDocument();
  });

  it('rolls dice and shows the total', () => {
    mockedPlay.mockReturnValueOnce({ dice: [3, 4], won: 50, result: 'win' });
    render(<OverUnderSeven />);
    fireEvent.click(screen.getByTestId('dice-bet-seven'));
    fireEvent.click(screen.getByTestId('dice-roll'));
    expect(screen.getByTestId('dice-total')).toHaveTextContent('7');
    expect(screen.getByTestId('dice-message')).toHaveTextContent('You win');
    fireEvent.click(screen.getByTestId('dice-next'));
    expect(screen.getByTestId('dice-roll')).toBeInTheDocument();
  });
});
