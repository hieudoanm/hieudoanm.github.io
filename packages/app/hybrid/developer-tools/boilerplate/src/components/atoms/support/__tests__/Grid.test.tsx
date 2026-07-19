import { render, screen } from '@testing-library/react';
import { Grid } from '../Grid';

describe('Grid', () => {
  it('renders children inside a grid with the default columns', () => {
    render(
      <Grid>
        <span>A</span>
        <span>B</span>
      </Grid>
    );
    expect(screen.getByText('A').parentElement).toHaveClass(
      'grid',
      'grid-cols-1',
      'gap-4'
    );
  });

  it('applies responsive column classes', () => {
    render(
      <Grid cols={1} smCols={2} lgCols={3} gap="lg">
        <span>A</span>
      </Grid>
    );
    const grid = screen.getByText('A').parentElement;
    expect(grid).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'gap-6'
    );
  });
});
