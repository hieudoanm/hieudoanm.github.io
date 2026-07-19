import { render, screen } from '@testing-library/react';
import CouponsPage from '@/app/(templates)/crm/coupons/page';

describe('CouponsPage', () => {
  it('renders the CouponsPage', () => {
    render(<CouponsPage />);
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
  });
});
