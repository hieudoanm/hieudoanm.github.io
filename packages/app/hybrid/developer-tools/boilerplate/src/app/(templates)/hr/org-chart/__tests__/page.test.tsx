import { render, screen } from '@testing-library/react';
import OrgChartPage from '@/app/(templates)/hr/org-chart/page';

describe('OrgChartPage', () => {
  it('renders the OrgChartPage', () => {
    render(<OrgChartPage />);
    expect(screen.getByText('3 departments')).toBeInTheDocument();
  });
});
