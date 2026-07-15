import { render, fireEvent, screen } from '@testing-library/react';
import { T3 } from '../T3';

describe('T3', () => {
  it('should render correctly', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  const clickCell = (container: HTMLElement, index: number) => {
    const grid = container.querySelector('.grid.grid-cols-3.gap-2');
    if (!grid) return;
    const cells = grid.querySelectorAll('.aspect-square.w-full button');
    if (cells[index]) fireEvent.click(cells[index]);
  };

  const getCellText = (container: HTMLElement, index: number) => {
    const grid = container.querySelector('.grid.grid-cols-3.gap-2');
    if (!grid) return '';
    const cells = grid.querySelectorAll('.aspect-square.w-full button');
    return cells[index]?.textContent ?? '';
  };

  it('places X on click', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('alternates between X and O', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
    clickCell(container, 1);
    expect(getCellText(container, 1)).toBe('O');
  });

  it('does not overwrite occupied cell', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('resets the game', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Reset'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('undo removes last move', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Undo'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('shows winner when three in a row', () => {
    const { container } = render(<T3 onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 3);
    clickCell(container, 1);
    clickCell(container, 4);
    clickCell(container, 2);
    expect(screen.getByText(/Winner/)).toBeInTheDocument();
  });
});
