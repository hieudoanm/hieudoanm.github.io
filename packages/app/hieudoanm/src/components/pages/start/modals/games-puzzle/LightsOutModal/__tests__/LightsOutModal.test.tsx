import { render, screen } from '@testing-library/react';
import { LightsOutModal } from '..';

jest.mock('../useLightsOut', () => ({
  useLightsOut: () => ({
    board: [
      [false, true, false, true, false],
      [true, true, false, false, true],
      [false, false, false, false, false],
      [true, false, false, true, false],
      [false, true, false, false, false],
    ],
    movesCount: 0,
    solved: false,
    autoSolving: false,
    gridSize: 5,
    handleClick: jest.fn(),
    startAutoSolve: jest.fn(),
    newGame: jest.fn(),
  }),
}));

describe('LightsOutModal', () => {
  it('renders title and New Game button', () => {
    render(<LightsOutModal onClose={jest.fn()} />);
    expect(screen.getByText('Lights Out')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('shows moves count', () => {
    render(<LightsOutModal onClose={jest.fn()} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows Auto Solve button', () => {
    render(<LightsOutModal onClose={jest.fn()} />);
    expect(screen.getByText('Auto Solve')).toBeInTheDocument();
  });
});
