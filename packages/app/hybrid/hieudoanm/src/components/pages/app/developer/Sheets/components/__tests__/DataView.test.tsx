jest.mock('../SortIconModal', () => ({
  SortIcon: ({ active, dir }: { active: boolean; dir: number }) => (
    <span data-testid="sort-icon" data-active={active} data-dir={dir} />
  ),
}));

jest.mock('../../icons', () => ({
  IcoDownload: () => <span data-testid="ico-download" />,
  IcoSearch: () => <span data-testid="ico-search" />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { DataView } from '../DataViewModal';
import { QueryResult } from '../../types';

const baseResult: QueryResult = {
  columns: ['id', 'name'],
  rows: [
    [1, 'Alice'],
    [2, 'Bob'],
    [3, 'Charlie'],
  ],
};

const defaultProps = {
  activeTable: 'users',
  loading: false,
  queryResult: baseResult,
  filteredRows: baseResult.rows,
  search: '',
  sortCol: null as number | null,
  sortDir: 0,
  page: 0,
  totalPages: 1,
  pageRows: baseResult.rows,
  onSearch: jest.fn(),
  onSort: jest.fn(),
  onExport: jest.fn(),
  onPrevPage: jest.fn(),
  onNextPage: jest.fn(),
};

describe('DataView', () => {
  it('renders table name', () => {
    render(<DataView {...defaultProps} />);
    expect(screen.getByText('users')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataView {...defaultProps} />);
    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<DataView {...defaultProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows "Select a table" when no activeTable', () => {
    render(<DataView {...defaultProps} activeTable={null} />);
    expect(screen.getByText('Select a table')).toBeInTheDocument();
  });

  it('shows "No data" when table has no columns', () => {
    const emptyResult = { columns: [], rows: [] };
    render(
      <DataView
        {...defaultProps}
        activeTable="empty"
        queryResult={emptyResult}
        filteredRows={[]}
        pageRows={[]}
      />
    );
    expect(screen.getByText('No data in this table')).toBeInTheDocument();
  });

  it('calls onSearch when search input changes', () => {
    const onSearch = jest.fn();
    render(<DataView {...defaultProps} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Filter rows…');
    fireEvent.change(input, { target: { value: 'Ali' } });
    expect(onSearch).toHaveBeenCalledWith('Ali');
  });

  it('calls onSort when column header clicked', () => {
    const onSort = jest.fn();
    render(<DataView {...defaultProps} onSort={onSort} />);
    fireEvent.click(screen.getByText('id'));
    expect(onSort).toHaveBeenCalledWith(0);
  });

  it('shows export button', () => {
    render(<DataView {...defaultProps} />);
    expect(screen.getByText('Export table')).toBeInTheDocument();
  });

  it('shows pagination when rows exceed PAGE_SIZE', () => {
    const manyRows = Array.from({ length: 150 }, (_, i) => [i, `User ${i}`]);
    render(
      <DataView
        {...defaultProps}
        filteredRows={manyRows}
        pageRows={manyRows.slice(0, 100)}
        totalPages={2}
      />
    );
    expect(screen.getByText(/page 1 \/ 2/)).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    const { container } = render(<DataView {...defaultProps} loading={true} />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });
});
