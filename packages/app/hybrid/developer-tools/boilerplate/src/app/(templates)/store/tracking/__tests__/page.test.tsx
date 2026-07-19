import { render, screen } from '@testing-library/react';
import TrackingPage from '@/app/(templates)/store/tracking/page';

describe('TrackingPage', () => {
  it('renders the tracking page', () => {
    render(<TrackingPage />);
    expect(screen.getByText('ORD-2026-0174')).toBeInTheDocument();
  });
});
