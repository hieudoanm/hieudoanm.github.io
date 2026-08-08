import { render, screen } from '@testing-library/react';
import ServiceStatusPage from '@/app/(templates)/support/status/page';

describe('ServiceStatusPage', () => {
  it('renders the ServiceStatusPage', () => {
    render(<ServiceStatusPage />);
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
  });
});
