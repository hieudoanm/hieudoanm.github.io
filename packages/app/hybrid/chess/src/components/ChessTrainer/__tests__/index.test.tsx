import { fireEvent, render, screen } from '@testing-library/react';
import { ChessTrainer } from '../index';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('ChessTrainer', () => {
  it('shows the tactics tab by default', () => {
    render(<ChessTrainer onClose={jest.fn()} />);
    expect(screen.getByRole('heading', { name: 'Tactics' })).toBeInTheDocument();
  });

  it('switches between trainer tabs', () => {
    render(<ChessTrainer onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Perft' }));
    expect(screen.getByText('Run perft')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Coordinates' }));
    expect(screen.getByText('Board Coordinates')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Openings' }));
    expect(screen.getByText(/Openings \(spaced repetition\)/)).toBeInTheDocument();
  });
});
