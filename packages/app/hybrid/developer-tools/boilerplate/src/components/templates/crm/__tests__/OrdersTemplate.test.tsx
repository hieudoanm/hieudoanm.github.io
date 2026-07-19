import { fireEvent, render, screen, within } from '@testing-library/react';
import { OrdersTemplate } from '../OrdersTemplate';

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
