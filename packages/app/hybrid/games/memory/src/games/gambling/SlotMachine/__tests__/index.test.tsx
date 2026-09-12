import { fireEvent, render, screen } from '@testing-library/react';
import { SlotMachine } from '../index';
import { randomSymbols } from '../utils';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, randomSymbols: jest.fn() };
});

const { randomSymbols: mockedRandom } = jest.requireMock('../utils') as {
  randomSymbols: jest.Mock;
};

describe('SlotMachine', () => {
  it('renders three reels and the spin button', () => {
    render(<SlotMachine />);
    expect(screen.getByTestId('slot-reel-0')).toBeInTheDocument();
    expect(screen.getByTestId('slot-reel-2')).toBeInTheDocument();
    expect(screen.getByTestId('slot-spin')).toBeEnabled();
    expect(screen.getByTestId('slots-credits')).toHaveTextContent('100');
  });

  it('shows the jackpot message on a winning spin', () => {
    mockedRandom.mockReturnValue([5, 5, 5]);
    render(<SlotMachine />);
    fireEvent.click(screen.getByTestId('slot-spin'));
    expect(screen.getByTestId('slot-message')).toHaveTextContent(
      'You won 500!'
    );
  });

  it('shows the broke alert after exhausting credits', () => {
    mockedRandom.mockReturnValue([0, 2, 4]);
    render(<SlotMachine />);
    for (let index = 0; index < 10; index += 1) {
      fireEvent.click(screen.getByTestId('slot-spin'));
    }
    expect(screen.getByText(/Out of credits/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.queryByText(/Out of credits/)).toBeNull();
  });
});
