jest.mock('../useShikaku', () => ({
  useShikaku: () => ({
    clues: [
      { row: 0, col: 1, value: 6 },
      { row: 0, col: 4, value: 6 },
      { row: 2, col: 1, value: 6 },
      { row: 2, col: 4, value: 6 },
    ],
    placed: [],
    selectedClue: null,
    wrongFlash: null,
    isComplete: false,
    autoSolving: false,
    handleCellClick: jest.fn(),
    undo: jest.fn(),
    autoSolve: jest.fn(),
    newGame: jest.fn(),
  }),
}));

jest.mock('../utils', () => ({
  ROWS: 6,
  COLS: 6,
  getRegionColor: () => 'oklch(0.85 0.15 250)',
  generateRegions: jest.fn(),
  placeClues: jest.fn(),
  getRectangleCells: jest.fn(),
  validateRegion: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { Shikaku } from '..';

describe('Shikaku', () => {
  it('renders title', () => {
    render(<Shikaku onClose={jest.fn()} />);
    expect(screen.getByText('Shikaku')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Shikaku onClose={jest.fn()} />);
    expect(
      screen.getByText(/Click a number, then click a cell/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Shikaku onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('renders clue values', () => {
    render(<Shikaku onClose={jest.fn()} />);
    const sixes = screen.getAllByText('6');
    expect(sixes.length).toBeGreaterThanOrEqual(4);
  });

  it('does not show won message initially', () => {
    render(<Shikaku onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
