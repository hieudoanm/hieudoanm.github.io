import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Nikoli Puzzles')).toBeInTheDocument();
  });

  it('renders all 7 game cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Sudoku')).toBeInTheDocument();
    expect(screen.getByText('Nurikabe')).toBeInTheDocument();
    expect(screen.getByText('Masyu')).toBeInTheDocument();
    expect(screen.getByText('Shikaku')).toBeInTheDocument();
    expect(screen.getByText('Fillomino')).toBeInTheDocument();
    expect(screen.getByText('Norinori')).toBeInTheDocument();
    expect(screen.getByText('Heyawake')).toBeInTheDocument();
  });

  it('renders game descriptions', () => {
    render(<HomePage />);
    expect(screen.getByText(/Fill a 9×9 grid/)).toBeInTheDocument();
    expect(screen.getByText(/Paint cells black/)).toBeInTheDocument();
  });

  it('renders links to game pages', () => {
    render(<HomePage />);
    const sudokuLink = screen.getByText('Sudoku').closest('a');
    expect(sudokuLink).toHaveAttribute('href', '/sudoku');
  });
});
