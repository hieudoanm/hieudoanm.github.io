import { render, screen, fireEvent } from '@testing-library/react';

import { SheetsSidebar } from '@/components/molecules/SheetsSidebar';
import type { SqliteTableMeta } from '@/types/sqlite';

jest.mock('react-icons/fi', () => ({
  FiTable: () => <span data-testid="ico-table" />,
  FiDatabase: () => <span data-testid="ico-database" />,
  FiSearch: () => <span data-testid="ico-search" />,
  FiChevronDown: () => <span data-testid="ico-chev-down" />,
  FiChevronRight: () => <span data-testid="ico-chev-right" />,
}));

const tables: SqliteTableMeta[] = [
  { name: 'customers', rowCount: 100, columns: [] },
  { name: 'orders', rowCount: 50, columns: [] },
  { name: 'products', rowCount: 25, columns: [] },
];

const opfsFiles = ['my.db', 'backup.sqlite'];

describe('SheetsSidebar', () => {
  it('renders table names', () => {
    render(
      <SheetsSidebar
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
      <SheetsSidebar
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
      <SheetsSidebar
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
      <SheetsSidebar
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

  it('calls onToggleTable when chevron clicked', () => {
    const onToggleTable = jest.fn();
    render(
      <SheetsSidebar
        tables={tables}
        activeTable={null}
        opfsFiles={[]}
        expandedTables={{}}
        onToggleTable={onToggleTable}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Toggle orders'));
    expect(onToggleTable).toHaveBeenCalledWith('orders');
  });

  it('renders expanded table columns', () => {
    render(
      <SheetsSidebar
        tables={[
          {
            name: 'customers',
            rowCount: 100,
            columns: [
              {
                name: 'id',
                type: 'INTEGER',
                nullable: false,
                primaryKey: true,
              },
              { name: 'name', type: 'TEXT', nullable: true, primaryKey: false },
            ],
          },
        ]}
        activeTable={null}
        opfsFiles={[]}
        expandedTables={{ customers: true }}
        onToggleTable={jest.fn()}
        onSelectTable={jest.fn()}
        onLoadOpfs={jest.fn()}
      />
    );
    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('INTEGER')).toBeInTheDocument();
  });

  it('renders OPFS files section', () => {
    render(
      <SheetsSidebar
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
      <SheetsSidebar
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
