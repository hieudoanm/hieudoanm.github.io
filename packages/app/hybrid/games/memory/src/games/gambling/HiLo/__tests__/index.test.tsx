import { fireEvent, render, screen } from '@testing-library/react';
import { freshShuffledDeck } from '../utils';
import { HiLo } from '../index';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return {
    ...actual,
    freshShuffledDeck: jest.fn(() => actual.freshShuffledDeck()),
  };
});

const { freshShuffledDeck: mockedDeck } = jest.requireMock('../utils') as {
  freshShuffledDeck: jest.Mock;
};

describe('HiLo', () => {
  beforeEach(() => {
    mockedDeck.mockReset();
    mockedDeck.mockImplementation(() =>
      (['9', 'K', '3', 'A', 'Q'] as const).map((rank) => ({
        rank,
        suit: '♠' as const,
      }))
    );
  });

  it('renders the current card and guess buttons', () => {
    render(<HiLo />);
    expect(screen.getByTestId('hilo-card')).toHaveTextContent('2♠');
    expect(screen.getByTestId('hilo-higher')).toBeInTheDocument();
    expect(screen.getByTestId('hilo-lower')).toBeInTheDocument();
  });

  it('shows feedback after a guess', () => {
    render(<HiLo />);
    fireEvent.click(screen.getByTestId('hilo-higher'));
    expect(screen.getByTestId('hilo-message')).toHaveTextContent('Correct!');
    expect(screen.getByTestId('hilo-card')).toHaveTextContent('K♠');
    expect(screen.getByTestId('hilo-credits')).toHaveTextContent('210');
  });

  it('reports wrong guesses without crashing', () => {
    mockedDeck.mockImplementation(() =>
      (['7', '7', '8', '8', '9'] as const).map((rank) => ({
        rank,
        suit: '♦' as const,
      }))
    );
    render(<HiLo />);
    fireEvent.click(screen.getByTestId('hilo-higher'));
    expect(screen.getByTestId('hilo-message')).toHaveTextContent('Wrong!');
    expect(screen.getByTestId('hilo-credits')).toHaveTextContent('190');
  });
});
