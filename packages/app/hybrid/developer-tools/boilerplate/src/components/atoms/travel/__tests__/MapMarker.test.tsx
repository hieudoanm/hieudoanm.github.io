import { render, screen } from '@testing-library/react';
import { MapMarker } from '../MapMarker';

describe('MapMarker', () => {
  it('renders with a default accessible label', () => {
    render(<MapMarker />);
    expect(screen.getByRole('img', { name: 'Location' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<MapMarker size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  it('uses a custom label', () => {
    render(<MapMarker label="Hotel location" />);
    expect(
      screen.getByRole('img', { name: 'Hotel location' })
    ).toBeInTheDocument();
  });
});
