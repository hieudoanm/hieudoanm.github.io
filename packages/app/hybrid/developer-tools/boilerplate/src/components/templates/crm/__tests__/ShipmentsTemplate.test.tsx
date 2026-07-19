import { fireEvent, render, screen, within } from '@testing-library/react';
import { ShipmentsTemplate } from '../ShipmentsTemplate';

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
