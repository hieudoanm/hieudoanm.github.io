import { render, screen } from '@testing-library/react';
import { FlightBadge } from '../FlightBadge';

describe('FlightBadge', () => {
  it('renders the flight code', () => {
    render(<FlightBadge code="VN210" />);
    expect(screen.getByTestId('flight-badge')).toHaveTextContent('VN210');
  });

  it('hides the status text when on time', () => {
    render(<FlightBadge code="VN210" status="on-time" />);
    expect(screen.getByTestId('flight-badge')).not.toHaveTextContent('on-time');
  });

  it('shows the status text when delayed', () => {
    render(<FlightBadge code="VN210" status="delayed" />);
    expect(screen.getByTestId('flight-badge')).toHaveTextContent('· delayed');
    expect(screen.getByTestId('flight-badge')).toHaveClass('badge-warning');
  });
});
