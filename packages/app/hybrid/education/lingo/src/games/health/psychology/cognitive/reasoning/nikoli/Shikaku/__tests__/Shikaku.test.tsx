jest.mock('../useShikaku', () => ({
  useShikaku: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { useShikaku } from '../useShikaku';
import { Shikaku } from '..';

jest.mock('../utils', () => ({
  ROWS: 6,
  COLS: 6,
  getRegionColor: () => 'oklch(0.85 0.15 250)',
  generateRegions: jest.fn(),
  placeClues: jest.fn(),
  getRectangleCells: jest.fn(),
  validateRegion: jest.fn(),
}));

const mockedHook = jest.mocked(useShikaku);

const baseReturn = {
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
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedHook.mockReturnValue({ ...baseReturn });
});

describe('Shikaku', () => {
  it('renders description', () => {
    render(<Shikaku />);
    expect(
      screen.getByText(/Click a number, then click a cell/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Shikaku />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('renders clue values', () => {
    render(<Shikaku />);
    const sixes = screen.getAllByText('6');
    expect(sixes.length).toBeGreaterThanOrEqual(4);
  });

  it('does not show won message initially', () => {
    render(<Shikaku />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });

  it('shows won message when puzzle is solved', () => {
    mockedHook.mockReturnValue({ ...baseReturn, isComplete: true });
    render(<Shikaku />);
    expect(screen.getByText('Puzzle solved!')).toBeInTheDocument();
  });

  it('shows Stop text when autoSolving', () => {
    mockedHook.mockReturnValue({ ...baseReturn, autoSolving: true });
    render(<Shikaku />);
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    render(<Shikaku />);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });

  it('renders with placed regions', () => {
    const placed: {
      id: number;
      cells: [number, number][];
      clue: { row: number; col: number; value: number };
    }[] = [
      {
        id: 0,
        cells: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 0],
          [2, 1],
        ],
        clue: { row: 0, col: 1, value: 6 },
      },
    ];
    mockedHook.mockReturnValue({ ...baseReturn, placed });
    render(<Shikaku />);
    expect(screen.getAllByText('6').length).toBeGreaterThanOrEqual(1);
  });

  it('renders with wrongFlash', () => {
    mockedHook.mockReturnValue({
      ...baseReturn,
      wrongFlash: [
        [0, 1],
        [5, 5],
      ],
    });
    const { container } = render(<Shikaku />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders with selectedClue', () => {
    mockedHook.mockReturnValue({
      ...baseReturn,
      selectedClue: { row: 0, col: 1, value: 6 },
    });
    const { container } = render(<Shikaku />);
    expect(container.querySelector('.scale-105')).toBeInTheDocument();
  });

  it('renders with selectedClue on a different cell', () => {
    mockedHook.mockReturnValue({
      ...baseReturn,
      selectedClue: { row: 2, col: 4, value: 6 },
    });
    const { container } = render(<Shikaku />);
    expect(container.querySelector('.scale-105')).toBeInTheDocument();
  });
});
