import { render, screen } from '@testing-library/react';
import { BentoGrid } from '../BentoGrid';

describe('BentoGrid', () => {
  const cells = [
    { key: 'a', content: 'Featured', colSpan: 2 as const, rowSpan: 2 as const },
    { key: 'b', content: 'Small' },
  ];

  it('renders each cell with default spans', () => {
    render(<BentoGrid cells={cells} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('applies col-span and row-span classes', () => {
    const { container } = render(<BentoGrid cells={cells} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('grid-cols-4');
    const featured = grid.firstChild as HTMLElement;
    expect(featured).toHaveClass('col-span-2');
    expect(featured).toHaveClass('row-span-2');
  });

  it('accepts a className', () => {
    const { container } = render(<BentoGrid cells={cells} className="gap-2" />);
    expect(container.firstChild).toHaveClass('gap-2');
  });
});
