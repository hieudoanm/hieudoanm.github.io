import { render, fireEvent, screen } from '@testing-library/react';
import { Notakto } from '..';

describe('Notakto', () => {
  it('should render correctly', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
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
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('always places X (no O)', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
    clickCell(container, 1);
    expect(getCellText(container, 1)).toBe('X');
  });

  it('does not overwrite occupied cell', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('resets the game', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Reset'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('undo removes last move', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Undo'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('shows loser when three in a row', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 3);
    clickCell(container, 1);
    clickCell(container, 4);
    clickCell(container, 2);
    expect(screen.getByText(/loses/)).toBeInTheDocument();
  });

  it('player 1 has different color than player 2', () => {
    const { container } = render(<Notakto onClose={jest.fn()} />);
    clickCell(container, 0);
    const cell0 = container.querySelector(
      '.grid.grid-cols-3.gap-2 .aspect-square.w-full:nth-child(1) button'
    );
    expect(cell0?.className).toContain('text-info');

    clickCell(container, 1);
    const cell1 = container.querySelector(
      '.grid.grid-cols-3.gap-2 .aspect-square.w-full:nth-child(2) button'
    );
    expect(cell1?.className).toContain('text-error');
  });
});
