import { render, screen } from '@testing-library/react';
import InventoryPage from '@/app/(templates)/crm/inventory/page';

describe('InventoryPage', () => {
  it('renders the InventoryPage', () => {
    render(<InventoryPage />);
    expect(screen.getByText('4 items low on stock')).toBeInTheDocument();
  });
});
