import { render, screen } from '@testing-library/react';
import AlertsPage from '@/app/(templates)/finance/alerts/page';

describe('AlertsPage', () => {
  it('renders the AlertsPage', () => {
    render(<AlertsPage />);
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
    expect(screen.getByText('4 alerts')).toBeInTheDocument();
  });
});
