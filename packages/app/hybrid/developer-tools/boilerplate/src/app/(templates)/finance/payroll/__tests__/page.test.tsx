import { render, screen } from '@testing-library/react';
import PayrollPage from '@/app/(templates)/finance/payroll/page';

describe('PayrollPage', () => {
  it('renders the PayrollPage', () => {
    render(<PayrollPage />);
    expect(screen.getByText('2 of 4 runs paid')).toBeInTheDocument();
  });
});
