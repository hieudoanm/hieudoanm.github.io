import { render, screen, fireEvent } from '@testing-library/react';

import { TableDesignerModal } from '@/components/organisms/TableDesignerModal';
import type { SqliteTableMeta } from '@/types/sqlite';
import { emptyDesignColumn, type TableDesign } from '@/utils/schema';

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="ico-plus" />,
  FiX: () => <span data-testid="ico-x" />,
}));

const tables: SqliteTableMeta[] = [
  {
    name: 'customers',
    rowCount: 2,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
    ],
  },
  {
    name: 'orders',
    rowCount: 1,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
    ],
  },
];

const existingDesign: TableDesign = {
  name: 'orders',
  columns: [
    {
      ...emptyDesignColumn(),
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      nullable: false,
    },
    {
      ...emptyDesignColumn(),
      name: 'customer_id',
      type: 'INTEGER',
      nullable: false,
    },
  ],
  foreignKeys: [],
  indexes: [],
};

describe('TableDesignerModal', () => {
  it('renders a new table form with name input and a column row', () => {
    render(
      <TableDesignerModal
        tableName={null}
        initialDesign={null}
        tables={tables}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('New table')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. invoices')).toBeInTheDocument();
    expect(screen.getByText('CREATE TABLE preview')).toBeInTheDocument();
  });

  it('disables save until a name and a column are provided', () => {
    render(
      <TableDesignerModal
        tableName={null}
        initialDesign={null}
        tables={tables}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    const save = screen.getByText('Create table') as HTMLButtonElement;
    expect(save.disabled).toBe(true);
    fireEvent.change(screen.getByPlaceholderText('e.g. invoices'), {
      target: { value: 'invoices' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('column')[0], {
      target: { value: 'total' },
    });
    expect(
      (screen.getByText('Create table') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('calls onSave with cleaned columns', () => {
    const onSave = jest.fn();
    render(
      <TableDesignerModal
        tableName={null}
        initialDesign={null}
        tables={tables}
        onSave={onSave}
        onClose={jest.fn()}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('e.g. invoices'), {
      target: { value: 'invoices' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('column')[0], {
      target: { value: 'total' },
    });
    fireEvent.click(screen.getByText('Create table'));
    expect(onSave).toHaveBeenCalledWith('invoices', [
      expect.objectContaining({ name: 'total' }),
    ]);
  });

  it('shows the existing table name when editing', () => {
    render(
      <TableDesignerModal
        tableName="orders"
        initialDesign={existingDesign}
        tables={tables}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/Edit table/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('orders')).toBeDisabled();
    expect(screen.getByDisplayValue('customer_id')).toBeInTheDocument();
  });

  it('adds a column row via the Add column button', () => {
    render(
      <TableDesignerModal
        tableName={null}
        initialDesign={null}
        tables={tables}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getAllByPlaceholderText('column')).toHaveLength(1);
    fireEvent.click(screen.getByText('Add column'));
    expect(screen.getAllByPlaceholderText('column')).toHaveLength(2);
  });

  it('renders the live CREATE TABLE preview', () => {
    render(
      <TableDesignerModal
        tableName="orders"
        initialDesign={existingDesign}
        tables={tables}
        onSave={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/CREATE TABLE "orders"/)).toBeInTheDocument();
    expect(screen.getByText(/PRIMARY KEY/)).toBeInTheDocument();
  });
});
