import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryChip } from '../CategoryChip';

describe('CategoryChip', () => {
  it('renders category label', () => {
    render(<CategoryChip label="Politics" />);
    expect(
      screen.getByRole('button', { name: 'Politics' })
    ).toBeInTheDocument();
  });

  it('applies active variant when active', () => {
    render(<CategoryChip label="Politics" active />);
    expect(screen.getByRole('button', { name: 'Politics' })).toHaveClass(
      'btn-primary'
    );
  });

  it('applies ghost variant when inactive', () => {
    render(<CategoryChip label="Sports" />);
    expect(screen.getByRole('button', { name: 'Sports' })).toHaveClass(
      'btn-ghost'
    );
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<CategoryChip label="Politics" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Politics' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
