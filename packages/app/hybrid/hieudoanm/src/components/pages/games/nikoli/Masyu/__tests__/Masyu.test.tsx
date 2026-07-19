jest.mock('../useMasyu', () => ({
  useMasyu: () => ({
    pearls: [
      { row: 2, col: 2, color: 'black' },
      { row: 4, col: 4, color: 'white' },
    ],
    grid: Array.from({ length: 7 }, () => Array(7).fill(false)),
    won: false,
    size: 7,
    autoSolving: false,
    toggle: jest.fn(),
    undo: jest.fn(),
    autoSolve: jest.fn(),
    newGame: jest.fn(),
  }),
}));

import { render, screen } from '@testing-library/react';
import { Masyu } from '..';

describe('Masyu', () => {
  it('renders title', () => {
    render(<Masyu onClose={jest.fn()} />);
    expect(screen.getByText('Masyu')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Masyu onClose={jest.fn()} />);
    expect(
      screen.getByText(/Draw a single loop through all pearls/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Masyu onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Masyu onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
