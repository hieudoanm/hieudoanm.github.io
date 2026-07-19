import { render, screen } from '@testing-library/react';
import { TravelIcon } from '../TravelIcon';

describe('TravelIcon', () => {
  it('renders with a default accessible label', () => {
    render(<TravelIcon />);
    expect(screen.getByRole('img', { name: 'Travel' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<TravelIcon size={28} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '28');
    expect(screen.getByRole('img')).toHaveAttribute('height', '28');
  });

  it('uses a custom label', () => {
    render(<TravelIcon label="Flight booking" />);
    expect(
      screen.getByRole('img', { name: 'Flight booking' })
    ).toBeInTheDocument();
  });
});
