import { render, screen, fireEvent } from '@testing-library/react';

import { DbModals } from '@/components/molecules/DbModals';
import type {
  ResultTab,
  SqliteDatabase,
  SqliteTableMeta,
} from '@/types/sqlite';
import type { DesignColumn, TableDesign } from '@/utils/schema';

jest.mock('@/components/molecules/ExportModal', () => ({
  ExportModal: ({ tableName, columns, rows, onClose }: any) => (
    <div data-testid="export-modal">
      <span data-testid="export-table">{tableName}</span>
      <span data-testid="export-cols">{columns.length}</span>
      <span data-testid="export-rows">{rows.length}</span>
      <button onClick={onClose}>close-export</button>
    </div>
  ),
}));

jest.mock('@/components/molecules/ImportModal', () => ({
  ImportModal: ({ tables, defaultTable, onImport, onClose }: any) => (
    <div data-testid="import-modal">
      <span data-testid="import-default">{defaultTable}</span>
      <span data-testid="import-tables">{tables.length}</span>
      <button onClick={() => onImport('users', ['id'], [[1]], jest.fn())}>
        import-now
      </button>
      <button onClick={onClose}>close-import</button>
    </div>
  ),
}));

jest.mock('@/components/organisms/TableDesignerModal', () => ({
  TableDesignerModal: ({ tableName, initialDesign, onSave, onClose }: any) => (
    <div data-testid="designer-modal">
      <span data-testid="designer-table">{tableName}</span>
      <span data-testid="designer-cols">
        {initialDesign?.columns?.length ?? 0}
      </span>
      <button onClick={() => onSave('t', [])}>designer-save</button>
      <button onClick={onClose}>close-designer</button>
    </div>
  ),
}));

jest.mock('@/components/organisms/VisualizationModal', () => ({
  VisualizationModal: ({ dbFileName, onClose }: any) => (
    <div data-testid="viz-modal">
      <span data-testid="viz-file">{dbFileName}</span>
      <button onClick={onClose}>close-viz</button>
    </div>
  ),
}));

const base = {
  showExport: false,
  activeTab: null as ResultTab | null,
  activeTable: 'users' as string | null,
  exportColumns: ['id'],
  exportRows: [[1]],
  onCloseExport: jest.fn(),
  showImport: false,
  tables: [] as SqliteTableMeta[],
  onImport: jest.fn(),
  onCloseImport: jest.fn(),
  designerOpen: false,
  designingTable: null as string | null,
  design: null as TableDesign | null,
  onSaveDesign: jest.fn(),
  onCloseDesigner: jest.fn(),
  showViz: false,
  dbInstance: null as SqliteDatabase | null,
  dbFileName: null as string | null,
  onCloseViz: jest.fn(),
};

const cols: DesignColumn[] = [
  {
    name: 'id',
    type: 'INTEGER',
    nullable: false,
    primaryKey: true,
    unique: false,
    defaultValue: '',
    fkTable: '',
    fkColumn: '',
  },
];

describe('DbModals', () => {
  it('renders nothing when every modal is closed', () => {
    const { container } = render(<DbModals {...base} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the export modal with the query_result fallback', () => {
    render(<DbModals {...base} showExport activeTable={null} />);
    expect(screen.getByTestId('export-table').textContent).toBe('query_result');
    expect(screen.getByTestId('export-cols').textContent).toBe('1');
    fireEvent.click(screen.getByText('close-export'));
    expect(base.onCloseExport).toHaveBeenCalled();
  });

  it('renders the export modal with the active table', () => {
    render(<DbModals {...base} showExport />);
    expect(screen.getByTestId('export-table').textContent).toBe('users');
  });

  it('names the export query_result for a regular result tab', () => {
    const activeTab: ResultTab = {
      id: 'r1',
      sql: 'SELECT 1',
      columns: ['a'],
      rows: [[1]],
    };
    render(<DbModals {...base} showExport activeTab={activeTab} />);
    expect(screen.getByTestId('export-table').textContent).toBe('query_result');
  });

  it('names the export explain_plan for an explain tab', () => {
    const activeTab: ResultTab = {
      id: 'x1',
      sql: 'EXPLAIN SELECT 1',
      explain: true,
      columns: ['addr'],
      rows: [['x']],
    };
    render(<DbModals {...base} showExport activeTab={activeTab} />);
    expect(screen.getByTestId('export-table').textContent).toBe('explain_plan');
  });

  it('renders the import modal and passes the active table', () => {
    const onImport = jest.fn().mockResolvedValue({ inserted: 1, failed: 0 });
    render(
      <DbModals
        {...base}
        showImport
        tables={[{ name: 'users', rowCount: 1, columns: [] }]}
        onImport={onImport}
      />
    );
    expect(screen.getByTestId('import-default').textContent).toBe('users');
    expect(screen.getByTestId('import-tables').textContent).toBe('1');
    fireEvent.click(screen.getByText('import-now'));
    expect(onImport).toHaveBeenCalledWith(
      'users',
      ['id'],
      [[1]],
      expect.any(Function)
    );
    fireEvent.click(screen.getByText('close-import'));
    expect(base.onCloseImport).toHaveBeenCalled();
  });

  it('renders the table designer', () => {
    render(
      <DbModals
        {...base}
        designerOpen
        designingTable="users"
        design={{ name: 'users', columns: cols, foreignKeys: [], indexes: [] }}
      />
    );
    expect(screen.getByTestId('designer-table').textContent).toBe('users');
    expect(screen.getByTestId('designer-cols').textContent).toBe('1');
    fireEvent.click(screen.getByText('designer-save'));
    expect(base.onSaveDesign).toHaveBeenCalledWith('t', []);
    fireEvent.click(screen.getByText('close-designer'));
    expect(base.onCloseDesigner).toHaveBeenCalled();
  });

  it('renders the visualization modal only when a db instance exists', () => {
    render(
      <DbModals
        {...base}
        showViz
        dbInstance={{} as SqliteDatabase}
        dbFileName="app.db"
      />
    );
    expect(screen.getByTestId('viz-file').textContent).toBe('app.db');
    fireEvent.click(screen.getByText('close-viz'));
    expect(base.onCloseViz).toHaveBeenCalled();
  });

  it('skips the visualization modal without a db instance', () => {
    const { container } = render(<DbModals {...base} showViz />);
    expect(container.querySelector('[data-testid="viz-modal"]')).toBeNull();
  });
});
