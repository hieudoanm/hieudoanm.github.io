jest.mock('../useHeyawake', () => ({
  useHeyawake: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { useHeyawake } from '../useHeyawake';
import { Heyawake } from '..';

const mockedHook = jest.mocked(useHeyawake);

const baseReturn = {
  grid: Array.from({ length: 6 }, () =>
    Array.from({ length: 6 }, () => ({ shaded: false, roomId: 0 }))
  ),
  rooms: [
    {
      id: 0,
      cells: [[0, 0] as [number, number], [0, 1] as [number, number]],
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
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedHook.mockReturnValue({ ...baseReturn });
});

describe('Heyawake', () => {
  it('renders description', () => {
    render(<Heyawake />);
    expect(screen.getByText(/Shade cells so each room/)).toBeInTheDocument();
  });

  it('renders Undo, Auto Solve, New Game buttons', () => {
    render(<Heyawake />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('does not show won message initially', () => {
    render(<Heyawake />);
    expect(screen.queryByText('Puzzle solved!')).not.toBeInTheDocument();
  });

  it('shows won message when puzzle is solved', () => {
    mockedHook.mockReturnValue({ ...baseReturn, won: true });
    render(<Heyawake />);
    expect(screen.getByText('Puzzle solved!')).toBeInTheDocument();
  });

  it('shows Stop text when autoSolving', () => {
    mockedHook.mockReturnValue({ ...baseReturn, autoSolving: true });
    render(<Heyawake />);
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    render(<Heyawake />);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });
});
