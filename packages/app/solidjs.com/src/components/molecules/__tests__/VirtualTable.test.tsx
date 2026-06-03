import { render, screen, fireEvent } from '@solidjs/testing-library';
import { VirtualTable, type Column } from '../VirtualTable';

interface TestRow {
  id: number;
  name: string;
  value: string;
}

const columns: Column<TestRow>[] = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Value' },
];

const data: TestRow[] = [
  { id: 1, name: 'Alpha', value: 'A' },
  { id: 2, name: 'Beta', value: 'B' },
  { id: 3, name: 'Gamma', value: 'C' },
];

describe('VirtualTable', () => {
  it('renders column headers', () => {
    render(() => (
      <VirtualTable columns={columns} data={data} rowHeight={40} height={200} />
    ));
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('renders all data rows', () => {
    render(() => (
      <VirtualTable columns={columns} data={data} rowHeight={40} height={200} />
    ));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('renders cell values by default', () => {
    render(() => (
      <VirtualTable columns={columns} data={data} rowHeight={40} height={200} />
    ));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('uses custom renderCell when provided', () => {
    render(() => (
      <VirtualTable
        columns={columns}
        data={data}
        rowHeight={40}
        height={200}
        renderCell={(item) => <span>★{item.name}★</span>}
      />
    ));
    expect(screen.getAllByText('★Alpha★').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('★Beta★').length).toBeGreaterThanOrEqual(1);
  });

  it('renders empty state with no data', () => {
    render(() => (
      <VirtualTable columns={columns} data={[]} rowHeight={40} height={200} />
    ));
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('selects a row on click', () => {
    render(() => (
      <VirtualTable columns={columns} data={data} rowHeight={40} height={200} />
    ));
    const cells = screen.getAllByText('Alpha');
    fireEvent.click(cells[0]);
    const rows = document.querySelectorAll('[role="row"]');
    const selected = Array.from(rows).find(
      (r) => r.getAttribute('aria-selected') === 'true'
    );
    expect(selected).toBeDefined();
  });

  it('navigates with arrow keys', () => {
    render(() => (
      <VirtualTable columns={columns} data={data} rowHeight={40} height={200} />
    ));
    const grid = screen.getByRole('grid');
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    const rows = document.querySelectorAll('[role="row"]');
    const selected = Array.from(rows).filter(
      (r) => r.getAttribute('aria-selected') === 'true'
    );
    expect(selected.length).toBe(1);
  });
});
