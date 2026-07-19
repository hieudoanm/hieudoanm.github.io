jest.mock('../useNorinori', () => ({
  useNorinori: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { useNorinori } from '../useNorinori';
import { Norinori } from '..';

const mockedHook = jest.mocked(useNorinori);

const baseReturn = {
  grid: Array.from({ length: 6 }, () => Array(6).fill(false)),
  clues: { rows: [2, 1, 2, 1, 2, 1], cols: [1, 2, 1, 2, 1, 2] },
  won: false,
  size: 6,
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

describe('Norinori', () => {
  it('renders description', () => {
    render(<Norinori />);
    expect(
      screen.getByText(/Shade cells so each row\/column/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Norinori />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Norinori />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });

  it('shows won message when puzzle is solved', () => {
    mockedHook.mockReturnValue({ ...baseReturn, won: true });
    render(<Norinori />);
    expect(screen.getByText('Puzzle solved!')).toBeInTheDocument();
  });

  it('shows Stop text when autoSolving', () => {
    mockedHook.mockReturnValue({ ...baseReturn, autoSolving: true });
    render(<Norinori />);
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    render(<Norinori />);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });
});
