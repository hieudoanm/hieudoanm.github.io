jest.mock('../useFillomino', () => ({
  useFillomino: () => ({
    puzzle: [
      [2, null, null, null, null, 3],
      [null, 2, null, 4, null, null],
      [5, null, null, null, null, null],
      [null, 5, null, null, 6, null],
      [null, null, 2, null, null, 6],
      [1, null, null, 3, null, null],
    ],
    grid: [
      [2, 1, 1, 1, 1, 3],
      [2, 2, 1, 4, 4, 3],
      [5, 5, 5, 4, 4, 3],
      [5, 5, 5, 6, 6, 6],
      [1, 1, 2, 6, 6, 6],
      [1, 1, 2, 3, 3, 3],
    ],
    selected: null,
    won: false,
    size: 6,
    autoSolving: false,
    emptyCount: 18,
    handleCellClick: jest.fn(),
    setCell: jest.fn(),
    undo: jest.fn(),
    autoSolve: jest.fn(),
    newGame: jest.fn(),
  }),
}));

import { render, screen } from '@testing-library/react';
import { Fillomino } from '..';

describe('Fillomino', () => {
  it('renders title', () => {
    render(<Fillomino onClose={jest.fn()} />);
    expect(screen.getByText('Fillomino')).toBeInTheDocument();
  });

  it('renders number buttons 1-6', () => {
    render(<Fillomino onClose={jest.fn()} />);
    for (let i = 1; i <= 6; i++) {
      expect(screen.getAllByText(String(i)).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders clear button', () => {
    render(<Fillomino onClose={jest.fn()} />);
    const clearBtns = screen.getAllByText('✕');
    expect(clearBtns.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Fillomino onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Fillomino onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
