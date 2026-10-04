import { render, screen } from '@testing-library/react';

import NikoliSudokuPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/sudoku/page';

describe('NikoliSudokuPage', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('names the puzzle', () => {
    render(<NikoliSudokuPage />);

    expect(screen.getByRole('heading', { name: 'Sudoku' })).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliSudokuPage />);

    expect(
      screen.getByText(/deduction from what the grid already forbids/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliSudokuPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliSudokuPage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
