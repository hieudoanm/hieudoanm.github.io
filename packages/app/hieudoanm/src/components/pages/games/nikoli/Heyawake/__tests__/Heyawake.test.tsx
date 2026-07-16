jest.mock('../useHeyawake', () => ({
  useHeyawake: () => ({
    grid: Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, () => ({ shaded: false, roomId: 0 }))
    ),
    rooms: [
      {
        id: 0,
        cells: [
          [0, 0],
          [0, 1],
        ],
        clue: 1,
      },
    ],
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
import { Heyawake } from '..';

describe('Heyawake', () => {
  it('renders title', () => {
    render(<Heyawake onClose={jest.fn()} />);
    expect(screen.getByText('Heyawake')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Heyawake onClose={jest.fn()} />);
    expect(screen.getByText(/Shade cells so each room/)).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Heyawake onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Heyawake onClose={jest.fn()} />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });
});
