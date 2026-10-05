import { fireEvent, render, screen } from '@testing-library/react';

import { DataTable, type ColumnSpec } from '@/components/molecules/DataTable';

interface Row {
  name: string;
  score: number | null;
}

const rows: Row[] = [
  { name: 'bravo', score: 10 },
  { name: 'alpha', score: null },
  { name: 'charlie', score: 30 },
];

const columns: ColumnSpec<Row>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.name,
    sortValue: (row) => row.name,
  },
  {
    id: 'score',
    header: 'Score',
    cell: (row) => row.score ?? '—',
    sortValue: (row) => row.score,
  },
];

const names = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => (row as HTMLTableRowElement).cells[0]?.textContent ?? '');

describe('DataTable', () => {
  test('renders a header and one row per record', () => {
    render(
      <DataTable rows={rows} columns={columns} rowKey={(row) => row.name} />
    );
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(screen.getByText('bravo')).toBeInTheDocument();
  });

  test('sorts a column when its header is clicked', () => {
    render(
      <DataTable rows={rows} columns={columns} rowKey={(row) => row.name} />
    );
    fireEvent.click(screen.getByText('Name'));
    expect(names()[0]).toBe('alpha');
    fireEvent.click(screen.getByText('Name'));
    expect(names()[0]).toBe('charlie');
  });

  test('sorts a numeric column and keeps missing values last', () => {
    render(
      <DataTable rows={rows} columns={columns} rowKey={(row) => row.name} />
    );
    fireEvent.click(screen.getByText('Score'));
    expect(names()).toEqual(['charlie', 'bravo', 'alpha']);
    fireEvent.click(screen.getByText('Score'));
    expect(names()).toEqual(['bravo', 'charlie', 'alpha']);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  test('calls back with the clicked record', () => {
    const onRowClick = jest.fn();
    render(
      <DataTable
        rows={rows}
        columns={columns}
        onRowClick={onRowClick}
        rowKey={(row) => row.name}
      />
    );
    fireEvent.click(screen.getByText('charlie'));
    expect(onRowClick).toHaveBeenCalledWith({ name: 'charlie', score: 30 });
  });

  test('says nothing is there instead of drawing an empty grid', () => {
    render(
      <DataTable
        rows={[]}
        columns={columns}
        rowKey={() => ''}
        emptyMessage="No runs yet."
      />
    );
    expect(screen.getByText('No runs yet.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('exposes the record keys to assistive technology', () => {
    render(
      <DataTable rows={rows} columns={columns} rowKey={(row) => row.name} />
    );
    expect(screen.getByText('bravo, alpha, charlie')).toBeInTheDocument();
  });
});
