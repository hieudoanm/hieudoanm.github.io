import { render, fireEvent, screen } from '@testing-library/react';
import { Duck } from '..';

describe('Duck', () => {
  it('should render correctly', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
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

  it('places X on click in mark phase', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(getCellText(container, 0)).toBe('X');
  });

  it('enters duck phase after placing mark', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0);
    expect(screen.getByText(/move duck/)).toBeInTheDocument();
  });

  it('shows duck after moving', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // Place X at 0
    clickCell(container, 4); // Move duck to 4
    expect(getCellText(container, 4)).toContain('🦆');
  });

  it('alternates players after full turn', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // X places
    clickCell(container, 4); // X moves duck
    expect(screen.getByText(/O/)).toBeInTheDocument();
  });

  it('cannot place mark on duck', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // X places
    clickCell(container, 4); // X moves duck
    clickCell(container, 4); // O tries to place on duck - should fail
    expect(getCellText(container, 4)).toContain('🦆');
  });

  it('cannot place mark on occupied cell', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // X places
    clickCell(container, 4); // X moves duck
    clickCell(container, 0); // O tries to place on X - should fail
    expect(getCellText(container, 0)).toBe('X');
  });

  it('duck must move to different square', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // X places
    clickCell(container, 4); // X moves duck to 4
    clickCell(container, 1); // O places
    clickCell(container, 4); // O tries to keep duck at 4 - should fail
    expect(getCellText(container, 4)).toContain('🦆');
  });

  it('resets the game', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0);
    fireEvent.click(screen.getByText('Reset'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('undo removes last move', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0);
    clickCell(container, 4);
    fireEvent.click(screen.getByText('Undo'));
    expect(getCellText(container, 0)).toBe('');
  });

  it('shows winner when three in a row', () => {
    const { container } = render(<Duck onClose={jest.fn()} />);
    clickCell(container, 0); // X
    clickCell(container, 8); // duck
    clickCell(container, 3); // O
    clickCell(container, 7); // duck
    clickCell(container, 1); // X
    clickCell(container, 6); // duck
    clickCell(container, 2); // X - wins top row
    expect(screen.getByText(/Winner/)).toBeInTheDocument();
  });
});
