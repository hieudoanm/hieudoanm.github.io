import { render, screen, fireEvent } from '@testing-library/react';

import { DataView } from '@/components/molecules/DataView';
import type { SqliteQueryResult } from '@/types/sqlite';

jest.mock('@/components/atoms/SortIcon', () => ({
  SortIcon: ({ active, dir }: { active: boolean; dir: number }) => (
    <span data-testid="sort-icon" data-active={active} data-dir={dir} />
  ),
}));

jest.mock('react-icons/fi', () => ({
  FiDownload: () => <span data-testid="ico-download" />,
  FiSearch: () => <span data-testid="ico-search" />,
  FiMoreHorizontal: () => <span data-testid="ico-more" />,
  FiPlus: () => <span data-testid="ico-plus" />,
  FiUpload: () => <span data-testid="ico-upload" />,
}));

const baseResult: SqliteQueryResult = {
  columns: ['id', 'name'],
  rows: [
    [1, 'Alice'],
    [2, 'Bob'],
    [3, 'Charlie'],
  ],
};

const defaultProps = {
  activeTable: 'users' as string | null,
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

  it('shows "Select a table" when no activeTable and no result', () => {
    const emptyResult = { columns: [], rows: [] };
    render(
      <DataView
        {...defaultProps}
        activeTable={null}
        queryResult={emptyResult}
        filteredRows={[]}
        pageRows={[]}
      />
    );
    expect(screen.getByText('Select a table')).toBeInTheDocument();
  });

  it('renders query results when no activeTable but columns exist', () => {
    render(<DataView {...defaultProps} activeTable={null} />);
    expect(screen.getByText('Query result')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
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

  it('clears the search via the clear button', () => {
    const onSearch = jest.fn();
    render(<DataView {...defaultProps} search="Ali" onSearch={onSearch} />);
    fireEvent.click(screen.getByText('×'));
    expect(onSearch).toHaveBeenCalledWith('');
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

  it('shows add-row button when editable', () => {
    render(<DataView {...defaultProps} editable={true} onAddRow={jest.fn()} />);
    expect(screen.getByText('Row')).toBeInTheDocument();
  });

  it('calls onAddRow when the Row button is clicked', () => {
    const onAddRow = jest.fn();
    render(<DataView {...defaultProps} editable={true} onAddRow={onAddRow} />);
    fireEvent.click(screen.getByText('Row'));
    expect(onAddRow).toHaveBeenCalled();
  });

  it('edits a cell and commits on Enter', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView
        {...defaultProps}
        editable={true}
        onUpdateCell={onUpdateCell}
        pageOriginalIndices={[10, 11, 12]}
      />
    );
    fireEvent.doubleClick(screen.getByText('Alice'));
    const input = screen.getByDisplayValue('Alice');
    fireEvent.change(input, { target: { value: 'Alicia' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onUpdateCell).toHaveBeenCalledWith(10, 1, 'Alicia');
  });

  it('turns empty edits into NULL', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView {...defaultProps} editable={true} onUpdateCell={onUpdateCell} />
    );
    fireEvent.doubleClick(screen.getByText('Alice'));
    const input = screen.getByDisplayValue('Alice');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(onUpdateCell).toHaveBeenCalledWith(0, 1, null);
  });

  it('opens the row menu and deletes a row', () => {
    const onDeleteRow = jest.fn();
    render(
      <DataView
        {...defaultProps}
        editable={true}
        onDeleteRow={onDeleteRow}
        pageOriginalIndices={[10, 11, 12]}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Row actions')[0]);
    fireEvent.click(screen.getByText('Delete row'));
    expect(onDeleteRow).toHaveBeenCalledWith(10);
  });

  it('copies a row as SQL INSERT via the row menu', () => {
    const onCopyRow = jest.fn();
    render(
      <DataView
        {...defaultProps}
        editable={true}
        onCopyRow={onCopyRow}
        pageOriginalIndices={[0, 1, 2]}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Row actions')[1]);
    fireEvent.click(screen.getByText('Copy SQL INSERT'));
    expect(onCopyRow).toHaveBeenCalledWith(1, 'sql');
  });

  it('calls onColFilter when a column filter input changes', () => {
    const onColFilter = jest.fn();
    render(<DataView {...defaultProps} onColFilter={onColFilter} />);
    const inputs = screen.getAllByPlaceholderText('filter');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(onColFilter).toHaveBeenCalledWith(0, '1');
  });

  it('does not start editing Uint8Array cells', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView
        {...defaultProps}
        editable={true}
        onUpdateCell={onUpdateCell}
        queryResult={{
          columns: ['blob'],
          rows: [[new Uint8Array([1, 2])]],
        }}
        filteredRows={[[new Uint8Array([1, 2])]]}
        pageRows={[[new Uint8Array([1, 2])]]}
      />
    );
    const cell = screen.getByText('[BLOB 2B]');
    fireEvent.doubleClick(cell);
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  it('commits numeric edits as numbers', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView {...defaultProps} editable={true} onUpdateCell={onUpdateCell} />
    );
    fireEvent.doubleClick(screen.getByText('Alice'));
    const input = screen.getByDisplayValue('Alice');
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onUpdateCell).toHaveBeenCalledWith(0, 1, '42');
  });

  it('does not call onUpdateCell when the value is unchanged', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView {...defaultProps} editable={true} onUpdateCell={onUpdateCell} />
    );
    fireEvent.doubleClick(screen.getByText('Alice'));
    const input = screen.getByDisplayValue('Alice');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onUpdateCell).not.toHaveBeenCalled();
  });

  it('cancels editing on Escape', () => {
    const onUpdateCell = jest.fn();
    render(
      <DataView {...defaultProps} editable={true} onUpdateCell={onUpdateCell} />
    );
    fireEvent.doubleClick(screen.getByText('Alice'));
    const input = screen.getByDisplayValue('Alice');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onUpdateCell).not.toHaveBeenCalled();
  });

  it('copies a row as JSON via the row menu', () => {
    const onCopyRow = jest.fn();
    render(
      <DataView
        {...defaultProps}
        editable={true}
        onCopyRow={onCopyRow}
        pageOriginalIndices={[0, 1, 2]}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Row actions')[0]);
    fireEvent.click(screen.getByText('Copy JSON'));
    expect(onCopyRow).toHaveBeenCalledWith(0, 'json');
  });

  it('closes the row menu when the overlay is clicked', () => {
    render(
      <DataView {...defaultProps} editable={true} pageOriginalIndices={[0]} />
    );
    fireEvent.click(screen.getAllByLabelText('Row actions')[0]);
    expect(screen.getByText('Delete row')).toBeInTheDocument();
    fireEvent.mouseDown(document.querySelector('.fixed.inset-0')!);
    expect(screen.queryByText('Delete row')).toBeNull();
  });

  it('uses page-relative indices when pageOriginalIndices is missing', () => {
    const onDeleteRow = jest.fn();
    render(
      <DataView
        {...defaultProps}
        page={2}
        editable={true}
        onDeleteRow={onDeleteRow}
      />
    );
    fireEvent.click(screen.getAllByLabelText('Row actions')[0]);
    fireEvent.click(screen.getByText('Delete row'));
    expect(onDeleteRow).toHaveBeenCalledWith(200);
  });

  it('shows the import button for a table with columns', () => {
    const onImport = jest.fn();
    render(<DataView {...defaultProps} onImport={onImport} />);
    fireEvent.click(screen.getByText('Import'));
    expect(onImport).toHaveBeenCalled();
  });

  it('toggles the row menu when the same action button is clicked', () => {
    render(<DataView {...defaultProps} editable={true} />);
    const btn = screen.getAllByLabelText('Row actions')[0];
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText('Delete row')).toBeNull();
  });
});
