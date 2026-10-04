jest.mock('../useNurikabe', () => ({
  useNurikabe: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { useNurikabe } from '../useNurikabe';
import { Nurikabe } from '..';
import { Grid } from '../types';

const mockedHook = jest.mocked(useNurikabe);

const mockGrid: Grid = Array.from({ length: 6 }, () =>
  Array.from({ length: 6 }, () => ({
    state: 'empty' as const,
    value: null,
    islandId: -1,
  }))
);

const baseReturn = {
  grid: mockGrid,
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

describe('Nurikabe', () => {
  it('renders description', () => {
    render(<Nurikabe />);
    expect(
      screen.getByText(/Shade cells to form numbered islands/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Nurikabe />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Nurikabe />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });

  it('shows won message when puzzle is solved', () => {
    mockedHook.mockReturnValue({ ...baseReturn, won: true });
    render(<Nurikabe />);
    expect(screen.getByText('Puzzle solved!')).toBeInTheDocument();
  });

  it('shows Stop text when autoSolving', () => {
    mockedHook.mockReturnValue({ ...baseReturn, autoSolving: true });
    render(<Nurikabe />);
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    render(<Nurikabe />);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });

  it('renders numbered cells', () => {
    const grid = mockGrid.map((row) => row.map((cell) => ({ ...cell })));
    grid[0][0] = { state: 'numbered', value: 2, islandId: 0 };
    mockedHook.mockReturnValue({ ...baseReturn, grid });
    render(<Nurikabe />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
