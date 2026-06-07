jest.mock('../../icons', () => ({
  IcoTable: () => <span data-testid="ico-table" />,
  IcoDatabase: () => <span data-testid="ico-database" />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import { TableMeta } from '../../types';

const tables: TableMeta[] = [
  { name: 'customers', rowCount: 100 },
  { name: 'orders', rowCount: 50 },
  { name: 'products', rowCount: 25 },
];

const opfsFiles = ['my.db', 'backup.sqlite'];

describe('Sidebar', () => {
  it('renders table names', () => {
    render(
      <Sidebar
        tables={tables}
        activeTable={null}
        opfsFiles={[]}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    expect(screen.getByText('customers')).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('products')).toBeInTheDocument();
  });

  it('shows "No tables" when empty', () => {
    render(
      <Sidebar
        tables={[]}
        activeTable={null}
        opfsFiles={[]}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    expect(screen.getByText('No tables')).toBeInTheDocument();
  });

  it('highlights active table', () => {
    render(
      <Sidebar
        tables={tables}
        activeTable="customers"
        opfsFiles={[]}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    const customerBtn = screen.getByText('customers').closest('button')!;
    expect(customerBtn.className).toContain('text-primary');
  });

  it('calls onSelectTable when table clicked', () => {
    const onSelectTable = jest.fn();
    render(
      <Sidebar
        tables={tables}
        activeTable={null}
        opfsFiles={[]}
        onSelectTable={onSelectTable}
        onLoadOpfs={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('orders'));
    expect(onSelectTable).toHaveBeenCalledWith('orders');
  });

  it('renders OPFS files section', () => {
    render(
      <Sidebar
        tables={tables}
        activeTable={null}
        opfsFiles={opfsFiles}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    expect(screen.getByText('my.db')).toBeInTheDocument();
    expect(screen.getByText('backup.sqlite')).toBeInTheDocument();
  });

  it('calls onLoadOpfs when OPFS file clicked', () => {
    const onLoadOpfs = jest.fn();
    render(
      <Sidebar
        tables={tables}
        activeTable={null}
        opfsFiles={opfsFiles}
        onSelectTable={jest.fn()}
        onLoadOpfs={onLoadOpfs}
      />
    );
    fireEvent.click(screen.getByText('my.db'));
    expect(onLoadOpfs).toHaveBeenCalledWith('my.db');
  });
});
