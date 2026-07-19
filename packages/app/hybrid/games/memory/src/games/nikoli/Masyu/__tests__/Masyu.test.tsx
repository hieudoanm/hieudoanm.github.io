jest.mock('../useMasyu', () => ({
  useMasyu: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { useMasyu } from '../useMasyu';
import { Masyu } from '..';

const mockedHook = jest.mocked(useMasyu);

const baseReturn = {
  pearls: [
    { row: 2, col: 2, color: 'black' as const },
    { row: 4, col: 4, color: 'white' as const },
  ],
  grid: Array.from({ length: 7 }, () => Array(7).fill(false)),
  won: false,
  size: 7,
  autoSolving: false,
  toggle: jest.fn(),
  undo: jest.fn(),
  autoSolve: jest.fn(),
  newGame: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedHook.mockReturnValue({ ...baseReturn });
});

describe('Masyu', () => {
  it('renders description', () => {
    render(<Masyu />);
    expect(
      screen.getByText(/Draw a single loop through all pearls/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Masyu />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Masyu />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });

  it('shows won message when puzzle is solved', () => {
    mockedHook.mockReturnValue({ ...baseReturn, won: true });
    render(<Masyu />);
    expect(screen.getByText('Puzzle solved!')).toBeInTheDocument();
  });

  it('shows Stop text when autoSolving', () => {
    mockedHook.mockReturnValue({ ...baseReturn, autoSolving: true });
    render(<Masyu />);
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    render(<Masyu />);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });
});
