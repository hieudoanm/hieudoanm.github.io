import { render, screen } from '@testing-library/react';

import { DEFAULT_SIZE } from '../constants';
import { Maze } from '../index';

describe('Maze', () => {
  it('renders a cell for every grid position', () => {
    render(<Maze />);

    expect(screen.getAllByRole('gridcell')).toHaveLength(DEFAULT_SIZE ** 2);
  });

  it('labels the start and end cells', () => {
    render(<Maze />);

    expect(
      screen.getByRole('gridcell', { name: /Row 1 column 1, start/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('gridcell', {
        name: `Row ${DEFAULT_SIZE} column ${DEFAULT_SIZE}, end`,
      })
    ).toBeInTheDocument();
  });

  it('reports the grid dimensions', () => {
    render(<Maze />);

    expect(
      screen.getByText(new RegExp(`^${DEFAULT_SIZE}×${DEFAULT_SIZE}`), {
        selector: 'span',
      })
    ).toBeInTheDocument();
  });

  it('exposes the size slider', () => {
    render(<Maze />);

    expect(screen.getByLabelText('Maze size')).toHaveValue(
      String(DEFAULT_SIZE)
    );
  });

  it('offers controls for a new maze and the shortest path', () => {
    render(<Maze />);

    expect(
      screen.getByRole('button', { name: 'New maze' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show shortest path' })
    ).toBeInTheDocument();
  });
});
