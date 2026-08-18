import { render, screen } from '@testing-library/react';
import ShipmentsPage from '@/app/(templates)/crm/shipments/page';

describe('ShipmentsPage', () => {
  it('renders the ShipmentsPage', () => {
    render(<ShipmentsPage />);
    expect(screen.getByText('SHP-101')).toBeInTheDocument();
  });
});
