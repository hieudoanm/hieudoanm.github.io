import { render, screen } from '@testing-library/react';
import PerformancePage from '@/app/(templates)/finance/performance/page';

describe('PerformancePage', () => {
  it('renders the PerformancePage', () => {
    render(<PerformancePage />);
    expect(
      screen.getByRole('heading', { name: 'Performance' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
  });
});
