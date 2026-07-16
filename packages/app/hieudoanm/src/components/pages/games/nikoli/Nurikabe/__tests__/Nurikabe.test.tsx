jest.mock('../useNurikabe', () => ({
  useNurikabe: () => ({
    grid: Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, () => ({
        state: 'empty' as const,
        value: null,
        islandId: -1,
      }))
    ),
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
import { Nurikabe } from '..';

describe('Nurikabe', () => {
  it('renders title', () => {
    render(<Nurikabe onClose={jest.fn()} />);
    expect(screen.getByText('Nurikabe')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Nurikabe onClose={jest.fn()} />);
    expect(
      screen.getByText(/Shade cells to form numbered islands/)
    ).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Nurikabe onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Nurikabe onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
