import { render, screen } from '@testing-library/react';
import { DepartureIcon } from '../DepartureIcon';

describe('DepartureIcon', () => {
  it('renders with a default accessible label', () => {
    render(<DepartureIcon />);
    expect(screen.getByRole('img', { name: 'Departure' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<DepartureIcon size={28} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '28');
    expect(screen.getByRole('img')).toHaveAttribute('height', '28');
  });

  it('uses a custom label', () => {
    render(<DepartureIcon label="Departure time" />);
    expect(
      screen.getByRole('img', { name: 'Departure time' })
    ).toBeInTheDocument();
  });
});
