import { render, screen } from '@testing-library/react';
import { InventoryTable } from '../InventoryTable';

const rows = [
  {
    id: '1',
    name: 'Mouse',
    sku: 'M-1',
    quantity: 5,
    reorderLevel: 10,
    price: 25,
  },
  {
    id: '2',
    name: 'Keyboard',
    sku: 'K-1',
    quantity: 20,
    reorderLevel: 5,
    price: 60,
  },
];

describe('InventoryTable', () => {
  it('renders product rows', () => {
    render(<InventoryTable rows={rows} />);
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('M-1')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('marks low stock rows with a warning badge', () => {
    render(<InventoryTable rows={rows} />);
    expect(screen.getByText('Low stock')).toHaveClass('badge-warning');
    expect(screen.getByText('In stock')).toHaveClass('badge-success');
  });

  it('shows an empty state when there are no rows', () => {
    render(<InventoryTable rows={[]} />);
    expect(screen.getByText('No inventory')).toBeInTheDocument();
  });
});
