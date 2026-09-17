import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LightsOut } from '../index';

describe('LightsOut', () => {
  it('renders a grid the size of the board', () => {
    render(<LightsOut />);

    expect(screen.getAllByRole('gridcell')).toHaveLength(25);
  });

  it('starts at zero moves and par eight', () => {
    render(<LightsOut />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('counts a move when a cell is pressed', async () => {
    const user = userEvent.setup();
    render(<LightsOut />);

    await user.click(screen.getAllByRole('gridcell')[0]);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('flips the pressed cell and its neighbours', async () => {
    const user = userEvent.setup();
    render(<LightsOut />);
    const cells = screen.getAllByRole('gridcell');
    const before = cells.map((cell) => cell.getAttribute('aria-label'));

    await user.click(cells[12]);

    expect(
      screen.getAllByRole('gridcell')[12].getAttribute('aria-label')
    ).not.toBe(before[12]);
    expect(
      screen.getAllByRole('gridcell')[7].getAttribute('aria-label')
    ).not.toBe(before[7]);
  });

  it('offers a new puzzle control', () => {
    render(<LightsOut />);

    expect(
      screen.getByRole('button', { name: 'New puzzle' })
    ).toBeInTheDocument();
  });

  it('offers a solution control', () => {
    render(<LightsOut />);

    expect(
      screen.getByRole('button', { name: 'Show solution' })
    ).toBeInTheDocument();
  });
});
