import { render, screen } from '@testing-library/react';
import AnalyticsPage from '@/app/(templates)/blog/analytics/page';

describe('AnalyticsPage', () => {
  it('renders the AnalyticsPage', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('8h 30m')).toBeInTheDocument();
  });
});
