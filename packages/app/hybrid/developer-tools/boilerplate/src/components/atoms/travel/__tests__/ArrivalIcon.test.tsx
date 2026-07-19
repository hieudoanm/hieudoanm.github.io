import { render, screen } from '@testing-library/react';
import { ArrivalIcon } from '../ArrivalIcon';

describe('ArrivalIcon', () => {
  it('renders with a default accessible label', () => {
    render(<ArrivalIcon />);
    expect(screen.getByRole('img', { name: 'Arrival' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<ArrivalIcon size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  it('uses a custom label', () => {
    render(<ArrivalIcon label="Arrival time" />);
    expect(
      screen.getByRole('img', { name: 'Arrival time' })
    ).toBeInTheDocument();
  });
});
