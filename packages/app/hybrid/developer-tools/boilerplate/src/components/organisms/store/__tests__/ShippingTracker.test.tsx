import { render, screen } from '@testing-library/react';
import { ShippingTracker } from '../ShippingTracker';

const updates = [
  {
    time: '08:00',
    location: 'Hub A',
    status: 'Out for delivery',
    description: 'With courier',
  },
  { time: '06:30', location: 'Hub B', status: 'Arrived at facility' },
];

describe('ShippingTracker', () => {
  it('renders carrier, tracking number and status', () => {
    render(
      <ShippingTracker
        carrier="FastPost"
        trackingNumber="FP-8899"
        status="In transit"
        estimatedDelivery="Aug 06"
        updates={updates}
      />
    );
    expect(screen.getByText('FastPost')).toBeInTheDocument();
    expect(screen.getByText('FP-8899')).toBeInTheDocument();
    expect(screen.getByText('In transit')).toBeInTheDocument();
    expect(screen.getByText(/ETA Aug 06/)).toBeInTheDocument();
  });

  it('renders the tracking timeline', () => {
    render(
      <ShippingTracker
        carrier="FastPost"
        trackingNumber="FP-8899"
        status="In transit"
        updates={updates}
      />
    );
    expect(screen.getByText('Out for delivery')).toBeInTheDocument();
    expect(screen.getByText('Arrived at facility')).toBeInTheDocument();
    expect(screen.getByText('With courier')).toBeInTheDocument();
  });
});
