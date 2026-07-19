import { render, screen } from '@testing-library/react';
import { SeatIcon } from '../SeatIcon';

describe('SeatIcon', () => {
  it('renders with a default accessible label', () => {
    render(<SeatIcon />);
    expect(screen.getByRole('img', { name: 'Seat' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<SeatIcon size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  it('uses a custom label', () => {
    render(<SeatIcon label="Seat selection" />);
    expect(
      screen.getByRole('img', { name: 'Seat selection' })
    ).toBeInTheDocument();
  });
});
