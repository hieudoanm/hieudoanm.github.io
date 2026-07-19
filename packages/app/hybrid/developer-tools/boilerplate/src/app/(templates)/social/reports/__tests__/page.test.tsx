import { render, screen } from '@testing-library/react';
import ReportsPage from '@/app/(templates)/social/reports/page';

describe('ReportsPage', () => {
  it('renders the ReportsPage', () => {
    render(<ReportsPage />);
    expect(
      screen.getByText('Generated for the last 30 days')
    ).toBeInTheDocument();
  });
});
