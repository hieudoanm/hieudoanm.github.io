import { render, screen } from '@testing-library/react';
import AnalyticsPage from '@/app/(templates)/app/analytics/page';

describe('AnalyticsPage', () => {
  it('renders the AnalyticsPage', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });
});
