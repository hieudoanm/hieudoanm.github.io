import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Towers } from '../index';

describe('Towers', () => {
  it('renders three pegs', () => {
    render(<Towers />);

    expect(screen.getAllByRole('button', { name: /^Peg \d/ })).toHaveLength(3);
  });

  it('shows the disk count and the optimum', () => {
    render(<Towers />);

    expect(screen.getByLabelText('Disk count')).toHaveValue('3');
    expect(
      screen.getByText((_, node) => node?.textContent === 'Optimal: 7')
    ).toBeInTheDocument();
  });

  it('moves a disk between pegs on click', async () => {
    const user = userEvent.setup();
    render(<Towers />);

    await user.click(screen.getByRole('button', { name: /^Peg 1/ }));
    await user.click(screen.getByRole('button', { name: /^Peg 2/ }));

    expect(
      screen.getByRole('button', { name: 'Peg 2, 1 disks' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Peg 1, 2 disks' })
    ).toBeInTheDocument();
  });

  it('undoes the last move', async () => {
    const user = userEvent.setup();
    render(<Towers />);

    await user.click(screen.getByRole('button', { name: /^Peg 1/ }));
    await user.click(screen.getByRole('button', { name: /^Peg 2/ }));
    await user.click(screen.getByRole('button', { name: 'Undo' }));

    expect(
      screen.getByRole('button', { name: 'Peg 2, 0 disks' })
    ).toBeInTheDocument();
  });

  it('disables undo until a move is made', () => {
    render(<Towers />);

    expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Redo' })).toBeDisabled();
  });

  it('exposes the disk count slider', () => {
    render(<Towers />);

    expect(screen.getByLabelText('Disk count')).toBeInTheDocument();
  });

  it('offers reset and a solution control', () => {
    render(<Towers />);

    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show solution' })
    ).toBeInTheDocument();
  });
});
