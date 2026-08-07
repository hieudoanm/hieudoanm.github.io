import { fireEvent, render, screen, within } from '@testing-library/react';
import { CouponsTemplate } from '../CouponsTemplate';
import { CustomersTemplate } from '../CustomersTemplate';
import { InventoryTemplate } from '../InventoryTemplate';
import { OrdersTemplate } from '../OrdersTemplate';
import { ProductsTemplate } from '../ProductsTemplate';
import { PromotionsTemplate } from '../PromotionsTemplate';
import { RefundsTemplate } from '../RefundsTemplate';
import { ShipmentsTemplate } from '../ShipmentsTemplate';
import CouponsPage from '@/app/(main)/admin/coupons/page';
import CustomersPage from '@/app/(main)/admin/customers/page';
import InventoryPage from '@/app/(main)/admin/inventory/page';
import OrdersPage from '@/app/(main)/admin/orders/page';
import ProductsPage from '@/app/(main)/admin/products/page';
import PromotionsPage from '@/app/(main)/admin/promotions/page';
import RefundsPage from '@/app/(main)/admin/refunds/page';
import ShipmentsPage from '@/app/(main)/admin/shipments/page';

describe('ProductsTemplate', () => {
  it('renders products with status badges and the active summary', () => {
    render(<ProductsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Products' })
    ).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('CH-001')).toBeInTheDocument();
    expect(screen.getByText('4 active products')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(4);
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('filters products by status', () => {
    render(<ProductsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Draft' }));
    expect(screen.getByText('Desk Lamp')).toBeInTheDocument();
    expect(screen.queryByText('Ergonomic Chair')).not.toBeInTheDocument();
    expect(screen.getByText('0 active products')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.queryByText('Desk Lamp')).not.toBeInTheDocument();
    expect(screen.getByText('4 active products')).toBeInTheDocument();
  });

  it('toggles a product between active and draft', () => {
    render(<ProductsTemplate />);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      4
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Deactivate' })[0]);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      3
    );
    expect(screen.getAllByRole('button', { name: 'Activate' })).toHaveLength(3);
    expect(screen.getByText('3 active products')).toBeInTheDocument();
  });
});

describe('OrdersTemplate', () => {
  it('renders orders with status badges and the summary', () => {
    render(<OrdersTemplate />);
    expect(screen.getByRole('heading', { name: 'Orders' })).toBeInTheDocument();
    expect(screen.getByText('6 orders')).toBeInTheDocument();
    expect(screen.getByText('#1001')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Processing')).toHaveLength(1);
    expect(within(table).getAllByText('Shipped')).toHaveLength(1);
    expect(within(table).getAllByText('Delivered')).toHaveLength(1);
    expect(within(table).getAllByText('Cancelled')).toHaveLength(1);
  });

  it('expands and collapses order items', () => {
    render(<OrdersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'View order #1001' }));
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide order #1001' }));
    expect(screen.queryByText('Ergonomic Chair')).not.toBeInTheDocument();
  });

  it('filters orders by status', () => {
    render(<OrdersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Pending' }));
    expect(screen.getByText('#1001')).toBeInTheDocument();
    expect(screen.queryByText('#1003')).not.toBeInTheDocument();
    expect(screen.getByText('6 orders')).toBeInTheDocument();
  });
});

describe('CustomersTemplate', () => {
  it('renders customers with segment badges and the summary', () => {
    render(<CustomersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Customers' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 customers')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('New')).toHaveLength(2);
    expect(within(table).getAllByText('Returning')).toHaveLength(3);
    expect(within(table).getAllByText('VIP')).toHaveLength(2);
  });

  it('searches customers by name or email', () => {
    render(<CustomersTemplate />);
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'alice' },
    });
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
    expect(screen.getByText('1 customers')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'grace@acme.com' },
    });
    expect(screen.getByText('Grace Kim')).toBeInTheDocument();
    expect(screen.getByText('1 customers')).toBeInTheDocument();
  });

  it('shows the empty state and filters by segment', () => {
    render(<CustomersTemplate />);
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No customers found')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'VIP' }));
    expect(screen.getByText('2 customers')).toBeInTheDocument();
    expect(screen.getByText('David Lee')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
  });
});

describe('InventoryTemplate', () => {
  it('renders inventory with low stock badges', () => {
    render(<InventoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Inventory' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 items low on stock')).toBeInTheDocument();
    expect(screen.getAllByText('Low stock')).toHaveLength(4);
    expect(screen.getByText('11 in stock')).toBeInTheDocument();
    expect(screen.getByText('32 in stock')).toBeInTheDocument();
  });

  it('updates stock with plus and minus buttons', () => {
    render(<InventoryTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease Mechanical Keyboard' })
    );
    expect(screen.getByText('5 items low on stock')).toBeInTheDocument();
    expect(screen.getAllByText('Low stock')).toHaveLength(5);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('10')).toHaveLength(2);
  });

  it('clamps stock at zero', () => {
    render(<InventoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('0')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Desk Lamp' }));
    fireEvent.click(screen.getByRole('button', { name: 'Increase Desk Lamp' }));
    expect(within(table).getAllByText('1')).toHaveLength(1);
  });
});

describe('CouponsTemplate', () => {
  it('renders coupons with usage and status badges', () => {
    render(<CouponsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Coupons' })
    ).toBeInTheDocument();
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
    expect(screen.getByText('42/100 uses')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Inactive')).toHaveLength(2);
  });

  it('validates the coupon create form', () => {
    render(<CouponsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a code and a discount between 1 and 99'
    );
    fireEvent.change(screen.getByLabelText('Coupon code'), {
      target: { value: 'SAVE20' },
    });
    fireEvent.change(screen.getByLabelText('Discount %'), {
      target: { value: '150' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a code and a discount between 1 and 99'
    );
  });

  it('adds a valid coupon and toggles active state', () => {
    render(<CouponsTemplate />);
    fireEvent.change(screen.getByLabelText('Coupon code'), {
      target: { value: 'SAVE20' },
    });
    fireEvent.change(screen.getByLabelText('Discount %'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add coupon' }));
    expect(screen.getByText('Coupon added')).toBeInTheDocument();
    expect(screen.getByText('SAVE20')).toBeInTheDocument();
    expect(screen.getByText('0/100 uses')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Toggle' })[0]);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Inactive')).toHaveLength(3);
  });
});

describe('PromotionsTemplate', () => {
  it('renders promotions with badges and spend progress', () => {
    render(<PromotionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Promotions' })
    ).toBeInTheDocument();
    expect(screen.getByText('Spring Sale')).toBeInTheDocument();
    expect(screen.getByText('$3,200')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Progress for Spring Sale' })
    ).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(2);
    expect(within(table).getAllByText('Scheduled')).toHaveLength(1);
    expect(within(table).getAllByText('Ended')).toHaveLength(2);
  });

  it('ends an active promotion', () => {
    render(<PromotionsTemplate />);
    expect(
      screen.getAllByRole('button', { name: 'End promotion' })
    ).toHaveLength(2);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'End promotion' })[0]
    );
    expect(
      screen.getAllByRole('button', { name: 'End promotion' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Ended')).toHaveLength(3);
    expect(within(table).getAllByText('Active')).toHaveLength(1);
  });

  it('filters promotions by status', () => {
    render(<PromotionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Scheduled' }));
    expect(screen.getByText('Flash Friday')).toBeInTheDocument();
    expect(screen.queryByText('Spring Sale')).not.toBeInTheDocument();
  });
});

describe('RefundsTemplate', () => {
  it('renders refunds with the pending summary', () => {
    render(<RefundsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Refunds' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Requested')).toHaveLength(3);
    expect(within(table).getAllByText('Approved')).toHaveLength(2);
    expect(within(table).getAllByText('Rejected')).toHaveLength(1);
  });

  it('approves a refund', () => {
    render(<RefundsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Approve' })[0]);
    expect(screen.getByText('2 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Approved')).toHaveLength(3);
    expect(within(table).getAllByText('Requested')).toHaveLength(2);
  });

  it('rejects a refund', () => {
    render(<RefundsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Reject' })[0]);
    expect(screen.getByText('2 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Rejected')).toHaveLength(2);
    expect(within(table).getAllByText('Requested')).toHaveLength(2);
  });
});

describe('ShipmentsTemplate', () => {
  it('renders shipments with status badges', () => {
    render(<ShipmentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Shipments' })
    ).toBeInTheDocument();
    expect(screen.getByText('SHP-101')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Shipped')).toHaveLength(1);
    expect(within(table).getAllByText('Delivered')).toHaveLength(2);
  });

  it('marks a pending shipment as shipped', () => {
    render(<ShipmentsTemplate />);
    expect(
      screen.getAllByRole('button', { name: 'Mark shipped' })
    ).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark shipped' })[0]);
    expect(
      screen.getAllByRole('button', { name: 'Mark shipped' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Shipped')).toHaveLength(2);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
  });

  it('filters shipments by status', () => {
    render(<ShipmentsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Delivered' }));
    expect(screen.getByText('SHP-103')).toBeInTheDocument();
    expect(screen.queryByText('SHP-101')).not.toBeInTheDocument();
    expect(screen.getByText('TRK-2R5T7F')).toBeInTheDocument();
  });
});

describe('Admin pages', () => {
  it('renders the ProductsPage', () => {
    render(<ProductsPage />);
    expect(screen.getByText('4 active products')).toBeInTheDocument();
  });

  it('renders the OrdersPage', () => {
    render(<OrdersPage />);
    expect(screen.getByText('6 orders')).toBeInTheDocument();
  });

  it('renders the CustomersPage', () => {
    render(<CustomersPage />);
    expect(screen.getByText('7 customers')).toBeInTheDocument();
  });

  it('renders the InventoryPage', () => {
    render(<InventoryPage />);
    expect(screen.getByText('4 items low on stock')).toBeInTheDocument();
  });

  it('renders the CouponsPage', () => {
    render(<CouponsPage />);
    expect(screen.getByText('SAVE10')).toBeInTheDocument();
  });

  it('renders the PromotionsPage', () => {
    render(<PromotionsPage />);
    expect(screen.getByText('Spring Sale')).toBeInTheDocument();
  });

  it('renders the RefundsPage', () => {
    render(<RefundsPage />);
    expect(screen.getByText('3 refunds pending')).toBeInTheDocument();
  });

  it('renders the ShipmentsPage', () => {
    render(<ShipmentsPage />);
    expect(screen.getByText('SHP-101')).toBeInTheDocument();
  });
});
