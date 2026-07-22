jest.mock('../useNorinori', () => ({
  useNorinori: () => ({
    clues: {
      rows: [1, 1, 1, 1, 1, 1],
      cols: [1, 1, 1, 1, 1, 1],
    },
    grid: Array.from({ length: 6 }, () => Array(6).fill(false)),
    won: false,
    size: 6,
    autoSolving: false,
    toggle: jest.fn(),
    undo: jest.fn(),
    autoSolve: jest.fn(),
    newGame: jest.fn(),
  }),
}));

import { render, screen } from '@testing-library/react';
import { Norinori } from '..';

describe('Norinori', () => {
  it('renders title', () => {
    render(<Norinori onClose={jest.fn()} />);
    expect(screen.getByText('Norinori')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Norinori onClose={jest.fn()} />);
    expect(
      screen.getByText(/Shade cells so each row\/column/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Norinori onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('renders clue numbers', () => {
    render(<Norinori onClose={jest.fn()} />);
    const ones = screen.getAllByText('1');
    expect(ones.length).toBeGreaterThanOrEqual(12);
  });

  it('does not show won message initially', () => {
    render(<Norinori onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
