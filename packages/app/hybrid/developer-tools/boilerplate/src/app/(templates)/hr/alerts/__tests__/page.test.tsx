import { render, screen } from '@testing-library/react';
import AlertsPage from '@/app/(templates)/hr/alerts/page';

describe('AlertsPage', () => {
  it('renders the alerts page', () => {
    render(<AlertsPage />);
    expect(
      screen.getByRole('heading', { name: 'Alerts showcase' })
    ).toBeInTheDocument();
  });
});
