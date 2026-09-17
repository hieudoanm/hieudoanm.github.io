import { fireEvent, render, screen } from '@testing-library/react';
import { Roulette } from '../index';
import { spinNumber } from '../utils';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, spinNumber: jest.fn() };
});

const { spinNumber: mockedSpin } = jest.requireMock('../utils') as {
  spinNumber: jest.Mock;
};

describe('Roulette', () => {
  it('renders the betting table with all seven bets', () => {
    render(<Roulette />);
    expect(screen.getByTestId('roulette-bets')).toBeInTheDocument();
    expect(screen.getByTestId('roulette-bet-zero')).toBeInTheDocument();
    expect(screen.getByTestId('roulette-spin')).toBeDisabled();
  });

  it('spins and shows the winning number', () => {
    mockedSpin.mockReturnValue(7);
    render(<Roulette />);
    fireEvent.click(screen.getByTestId('roulette-bet-red'));
    fireEvent.click(screen.getByTestId('roulette-spin'));
    expect(screen.getByTestId('roulette-number')).toHaveTextContent('7');
    expect(screen.getByTestId('roulette-message')).toHaveTextContent(
      'You win +20'
    );
    fireEvent.click(screen.getByTestId('roulette-next'));
    expect(screen.getByTestId('roulette-bets')).toBeInTheDocument();
  });
});
