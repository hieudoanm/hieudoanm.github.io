import { render, screen } from '@testing-library/react';
import SalesReportsPage from '@/app/(templates)/crm/reports/page';

describe('SalesReportsPage', () => {
  it('renders the SalesReportsPage', () => {
    render(<SalesReportsPage />);
    expect(screen.getByText('$84,200')).toBeInTheDocument();
  });
});
