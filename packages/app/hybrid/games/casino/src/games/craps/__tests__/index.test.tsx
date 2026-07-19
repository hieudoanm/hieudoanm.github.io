import { fireEvent, render, screen } from '@testing-library/react';
import { Craps } from '../index';
import { playComeOut, playPoint } from '../utils';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return {
    ...actual,
    playComeOut: jest.fn(actual.playComeOut),
    playPoint: jest.fn(actual.playPoint),
  };
});

const { playComeOut: mockedComeOut, playPoint: mockedPoint } = jest.requireMock(
  '../utils'
) as {
  playComeOut: jest.Mock;
  playPoint: jest.Mock;
};

describe('Craps', () => {
  it('shows the come-out prompt and roll button', () => {
    render(<Craps />);
    expect(screen.getByTestId('craps-status')).toHaveTextContent(
      /Come-out roll/
    );
    expect(screen.getByTestId('craps-roll')).toBeInTheDocument();
  });

  it('plays through point to a win', () => {
    mockedComeOut.mockReturnValueOnce({
      dice: [2, 3],
      total: 5,
      phase: 'point',
      won: 0,
    });
    mockedPoint.mockReturnValueOnce({
      dice: [2, 3],
      total: 5,
      phase: 'result',
      won: 20,
    });
    render(<Craps />);
    fireEvent.click(screen.getByTestId('craps-roll'));
    expect(screen.getByTestId('craps-status')).toHaveTextContent(/Point is 5/);
    fireEvent.click(screen.getByTestId('craps-roll'));
    expect(screen.getByTestId('craps-status')).toHaveTextContent(
      'Pass line wins +20!'
    );
  });

  it('returns to the come-out after finishing', () => {
    mockedComeOut.mockReturnValueOnce({
      dice: [6, 5],
      total: 11,
      phase: 'result',
      won: 20,
    });
    render(<Craps />);
    fireEvent.click(screen.getByTestId('craps-roll'));
    expect(screen.getByText(/Pass line wins/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('craps-next'));
    expect(screen.getByTestId('craps-status')).toHaveTextContent(
      /Come-out roll/
    );
  });
});
