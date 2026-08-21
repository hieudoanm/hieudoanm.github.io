import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { WorkspaceTemplate } from '@/components/templates/WorkspaceTemplate';
import type { MriApi } from '@/lib/api/client';
import type { Dataset } from '@/lib/api/types';

const dataset = (id: string, name: string): Dataset => ({
  id,
  name,
  description: '',
  sourcePath: '/tmp/src',
  path: '/tmp/dst',
  createdAt: 1767225600,
  updatedAt: 1767225600,
});

const createApi = (overrides: Partial<MriApi> = {}): MriApi => ({
  pickScanFiles: jest.fn().mockResolvedValue([]),
  importFiles: jest.fn().mockResolvedValue({
    datasetId: 'dataset://1',
    importedFiles: 2,
    skippedFiles: 0,
    seriesCount: 1,
  }),
  listDatasets: jest
    .fn()
    .mockResolvedValue([dataset('dataset://1', 'Study A')]),
  getDatasetDetail: jest.fn(),
  deleteDataset: jest.fn().mockResolvedValue(undefined),
  getSeriesMetadata: jest.fn(),
  getProvenance: jest.fn().mockResolvedValue([]),
  readSlice: jest.fn(),
  getStudyAnalysis: jest.fn(),
  listProtocols: jest.fn(),
  createProtocol: jest.fn(),
  deleteProtocol: jest.fn(),
  validateDataset: jest.fn(),
  runQc: jest.fn(),
  compareCompatibility: jest.fn(),
  ...overrides,
});

describe('WorkspaceTemplate', () => {
  const originalInternals = (
    window as unknown as { __TAURI_INTERNALS__?: unknown }
  ).__TAURI_INTERNALS__;

  beforeEach(() => {
    (
      window as unknown as { __TAURI_INTERNALS__?: unknown }
    ).__TAURI_INTERNALS__ = { invoke: jest.fn() };
  });

  afterEach(() => {
    (
      window as unknown as { __TAURI_INTERNALS__?: unknown }
    ).__TAURI_INTERNALS__ = originalInternals;
  });

  it('lists datasets with open and delete actions', async () => {
    render(<WorkspaceTemplate api={createApi()} />);
    await waitFor(() =>
      expect(screen.getByText('Study A')).toBeInTheDocument()
    );
    expect(screen.getByRole('link', { name: 'Open' })).toHaveAttribute(
      'href',
      '/studies?dataset=dataset%3A%2F%2F1'
    );
  });

  it('shows the desktop requirement outside the runtime', () => {
    delete (window as unknown as { __TAURI_INTERNALS__?: unknown })
      .__TAURI_INTERNALS__;
    render(<WorkspaceTemplate api={createApi()} />);
    expect(screen.getByTestId('desktop-required')).toBeInTheDocument();
    expect(screen.getByTestId('import-button')).toBeDisabled();
  });

  it('imports picked files and shows a summary', async () => {
    const api = createApi({
      pickScanFiles: jest.fn().mockResolvedValue(['/tmp/a.dcm', '/tmp/b.dcm']),
    });
    render(<WorkspaceTemplate api={api} />);
    fireEvent.click(screen.getByTestId('import-button'));
    await waitFor(() =>
      expect(screen.getByTestId('import-summary')).toHaveTextContent(
        'Imported 2 files into 1 series'
      )
    );
    expect(api.importFiles).toHaveBeenCalledWith(
      ['/tmp/a.dcm', '/tmp/b.dcm'],
      ''
    );
  });

  it('reports import errors', async () => {
    const api = createApi({
      pickScanFiles: jest.fn().mockRejectedValue(new Error('dialog failed')),
    });
    render(<WorkspaceTemplate api={api} />);
    fireEvent.click(screen.getByTestId('import-button'));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('dialog failed')
    );
  });

  it('searches datasets', async () => {
    const api = createApi();
    render(<WorkspaceTemplate api={api} />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'brain' },
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      key: 'Enter',
    });
    await waitFor(() => expect(api.listDatasets).toHaveBeenCalledWith('brain'));
  });

  it('deletes a dataset and refreshes', async () => {
    const api = createApi();
    render(<WorkspaceTemplate api={api} />);
    await waitFor(() => screen.getByText('Study A'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete Study A' }));
    await waitFor(() =>
      expect(api.deleteDataset).toHaveBeenCalledWith('dataset://1')
    );
    expect(api.listDatasets).toHaveBeenCalledTimes(2);
  });

  it('renders an empty state without datasets', async () => {
    render(
      <WorkspaceTemplate
        api={createApi({ listDatasets: jest.fn().mockResolvedValue([]) })}
      />
    );
    await waitFor(() =>
      expect(screen.getByText(/No datasets yet/)).toBeInTheDocument()
    );
  });

  it('reports refresh errors from the initial load', async () => {
    render(
      <WorkspaceTemplate
        api={createApi({
          listDatasets: jest.fn().mockRejectedValue(new Error('db locked')),
        })}
      />
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('db locked')
    );
  });

  it('reports delete errors', async () => {
    const api = createApi({
      deleteDataset: jest.fn().mockRejectedValue(new Error('cannot delete')),
    });
    render(<WorkspaceTemplate api={api} />);
    await waitFor(() => screen.getByText('Study A'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete Study A' }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('cannot delete')
    );
  });

  it('skips importing when the dialog returns no files', async () => {
    const api = createApi({
      pickScanFiles: jest.fn().mockResolvedValue([]),
    });
    render(<WorkspaceTemplate api={api} />);
    fireEvent.click(screen.getByTestId('import-button'));
    await waitFor(() => expect(api.pickScanFiles).toHaveBeenCalled());
    expect(api.importFiles).not.toHaveBeenCalled();
    expect(screen.queryByTestId('import-summary')).toBeNull();
  });

  it('mentions skipped files in the summary', async () => {
    const api = createApi({
      pickScanFiles: jest.fn().mockResolvedValue(['/tmp/a.dcm']),
      importFiles: jest.fn().mockResolvedValue({
        datasetId: 'dataset://1',
        importedFiles: 1,
        skippedFiles: 2,
        seriesCount: 1,
      }),
    });
    render(<WorkspaceTemplate api={api} />);
    fireEvent.click(screen.getByTestId('import-button'));
    await waitFor(() =>
      expect(screen.getByTestId('import-summary')).toHaveTextContent(
        '(2 skipped)'
      )
    );
  });
});
