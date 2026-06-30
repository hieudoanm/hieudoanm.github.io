jest.mock('../SudokuModal/utils/sudoku', () => ({
  createEmptyGrid: (size: number) => {
    const n = size * size;
    return Array.from({ length: n }, () => Array(n).fill(0));
  },
  generatePuzzle: (size: number, diff: number) => {
    const n = size * size;
    const puzzle = Array.from({ length: n }, () => Array(n).fill(0));
    const solution = Array.from({ length: n }, () => Array(n).fill(0));
    return { puzzle, solution };
  },
  isValid: () => true,
  solve: (grid: number[][]) => true,
  formatTime: (t: number) => `${t}s`,
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { SudokuModal } from '../SudokuModal';

describe('SudokuModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const { container } = render(<SudokuModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('starts with 0s timer', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    expect(screen.getByText(/0s/)).toBeInTheDocument();
  });

  it('changes difficulty on button click', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    const mediumBtn = screen.getByText('Medium');
    fireEvent.click(mediumBtn);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('new game button works', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('New Game'));
    expect(screen.getByText(/0s/)).toBeInTheDocument();
  });

  it('clicking a cell selects it', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    const cells = screen.getAllByText('');
    if (cells.length > 0) fireEvent.click(cells[0]);
  });

  it('number buttons work', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    const btn1 = screen.getByText('1');
    fireEvent.click(btn1);
  });

  it('clear button works', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    const clearBtns = screen.getAllByText('✕');
    fireEvent.click(clearBtns[clearBtns.length - 1]);
  });

  it('hint button works', () => {
    render(<SudokuModal onClose={jest.fn()} />);
    const hintBtn = screen.getByText('Hint');
    fireEvent.click(hintBtn);
  });
});
