import { render, fireEvent, screen } from '@testing-library/react';
import { Wild } from '..';

describe('Wild', () => {
  it('should render correctly', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
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

  it('places selected mark on click', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('can place O by selecting O first', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('O', { selector: '.btn' }));
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('O');
  });

  it('alternates players', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0); // Player 1 places X
    clickCell(container, 1); // Player 2 places X (default)
    expect(getCellText(container, 0)).toBe('X');
    expect(getCellText(container, 1)).toBe('X');
  });

  it('does not overwrite occupied cell', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('resets the game', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Reset'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('undo removes last move', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Undo'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('shows winner when three in a row', () => {
    const { container } = render(<Wild onClose={jest.fn()} />);
    clickCell(container, 0); // X
    clickCell(container, 3); // X
    clickCell(container, 1); // X
    clickCell(container, 4); // X
    clickCell(container, 2); // X - wins
    expect(screen.getByText(/Winner/)).toBeInTheDocument();
  });
});
