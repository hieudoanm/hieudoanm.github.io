import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import { ImportModal } from '@/components/molecules/ImportModal';
import type { SqliteTableMeta } from '@/types/sqlite';

const tables: SqliteTableMeta[] = [
  {
    name: 'users',
    rowCount: 0,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { name: 'name', type: 'TEXT', nullable: true, primaryKey: false },
      { name: 'email', type: 'TEXT', nullable: true, primaryKey: false },
    ],
  },
  {
    name: 'orders',
    rowCount: 0,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
    ],
  },
];

class MockFileReader {
  static content = '';
  result: string | ArrayBuffer | null = '';
  onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
  readAsText(): void {
    this.result = MockFileReader.content;
    this.onload?.({ target: this } as unknown as ProgressEvent<FileReader>);
  }
}

const loadCsv = (content: string): void => {
  MockFileReader.content = content;
  Object.defineProperty(window, 'FileReader', {
    configurable: true,
    writable: true,
    value: MockFileReader,
  });
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fireEvent.change(input, {
    target: { files: [new File([content], 'users.csv', { type: 'text/csv' })] },
  });
};

describe('ImportModal', () => {
  const onImport = jest.fn().mockResolvedValue({ inserted: 2, failed: 0 });

  beforeEach(() => {
    jest.clearAllMocks();
    onImport.mockResolvedValue({ inserted: 2, failed: 0 });
  });

  it('renders tabs, target table selector and close button', () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Import data')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'csv' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'json' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Import into/ })).toBeDisabled();
  });

  it('parses a CSV file, previews it and imports mapped columns', async () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    loadCsv('id,name\n1,Alice\n2,Bob');

    await waitFor(() => expect(screen.getByText(/2 rows/)).toBeInTheDocument());
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));
    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(
        'users',
        ['id', 'name'],
        [
          ['1', 'Alice'],
          ['2', 'Bob'],
        ],
        expect.any(Function)
      )
    );
    await waitFor(() =>
      expect(screen.getByText('Imported 2 rows')).toBeInTheDocument()
    );
  });

  it('applies manual column mapping overrides', async () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    loadCsv('id,name\n1,Alice');

    await waitFor(() => expect(screen.getByText(/1 rows/)).toBeInTheDocument());

    const mappingSelects = screen
      .getAllByRole('combobox')
      .filter((el) => within(el as HTMLElement).queryByText('— Skip —'));
    const emailSelect = mappingSelects[2] as HTMLSelectElement;
    fireEvent.change(emailSelect, { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));
    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(
        'users',
        ['id', 'name', 'email'],
        [['1', 'Alice', 'Alice']],
        expect.any(Function)
      )
    );
  });

  it('parses pasted JSON and imports rows', async () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'json' }));
    fireEvent.change(screen.getByPlaceholderText(/id": 1/), {
      target: { value: '[{"id":7,"name":"Carol"}]' },
    });

    await waitFor(() => expect(screen.getByText(/1 rows/)).toBeInTheDocument());
    expect(screen.getByText('Carol')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));
    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(
        'users',
        ['id', 'name'],
        [['7', 'Carol']],
        expect.any(Function)
      )
    );
  });

  it('reports JSON parse errors', async () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'json' }));
    fireEvent.change(screen.getByPlaceholderText(/id": 1/), {
      target: { value: '"hello"' },
    });

    await waitFor(() =>
      expect(screen.getByText(/JSON must be an array/)).toBeInTheDocument()
    );
    expect(screen.getByRole('button', { name: /Import into/ })).toBeDisabled();
  });

  it('reports a validation error when every column is skipped', async () => {
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    loadCsv('a,b\n1,2');

    await waitFor(() => expect(screen.getByText(/1 rows/)).toBeInTheDocument());

    const mappingSelects = screen
      .getAllByRole('combobox')
      .filter((el) => within(el as HTMLElement).queryByText('— Skip —'));
    for (const el of mappingSelects) {
      fireEvent.change(el as HTMLSelectElement, { target: { value: '-1' } });
    }

    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));
    await waitFor(() =>
      expect(
        screen.getByText('Select at least one column to import.')
      ).toBeInTheDocument()
    );
    expect(onImport).not.toHaveBeenCalled();
  });

  it('shows import progress and a failed-row warning', async () => {
    onImport.mockImplementation(async (_t, _c, _r, onProgress) => {
      onProgress(500, 1000);
      onProgress(1000, 1000);
      return { inserted: 999, failed: 1 };
    });
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={jest.fn()}
      />
    );
    loadCsv('id\n1');

    await waitFor(() => expect(screen.getByText(/1 rows/)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));

    await waitFor(() =>
      expect(screen.getByText('1,000 / 1,000')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/1 rows failed validation/)).toBeInTheDocument()
    );
  });

  it('closes via the Done button after import', async () => {
    const onClose = jest.fn();
    render(
      <ImportModal
        tables={tables}
        defaultTable="users"
        onImport={onImport}
        onClose={onClose}
      />
    );
    loadCsv('id\n1');
    await waitFor(() => expect(screen.getByText(/1 rows/)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Import into/ }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(onClose).toHaveBeenCalled();
  });
});
