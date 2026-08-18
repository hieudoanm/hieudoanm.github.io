import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DicomwebTemplate } from '@/components/templates/DicomwebTemplate';
import type { MriApi } from '@/lib/api/client';
import type {
  DicomwebServer,
  ImportSummary,
  QidoSeries,
  QidoStudy,
  StowResult,
} from '@/lib/api/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const server: DicomwebServer = {
  id: 'server://pacs',
  name: 'Hospital PACS',
  url: 'http://pacs.local/dicom-web',
  authHeader: '',
  createdAt: 1,
};

const study: QidoStudy = {
  studyUid: '1.2.3',
  patientName: 'DOE^JOHN',
  studyDate: '20240115',
  studyDescription: 'MR BRAIN',
};

const series: QidoSeries = {
  seriesUid: '4.5.6',
  seriesDescription: 'T1 MPRAGE',
  modality: 'MR',
  instanceCount: 176,
};

const summary: ImportSummary = {
  datasetId: 'dataset://new',
  importedFiles: 176,
  skippedFiles: 0,
  seriesCount: 1,
};

const stowResult: StowResult = { stored: 2, failed: 0 };

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    listDicomwebServers: jest.fn().mockResolvedValue([server]),
    addDicomwebServer: jest.fn().mockResolvedValue(server),
    deleteDicomwebServer: jest.fn().mockResolvedValue(undefined),
    qidoStudies: jest.fn().mockResolvedValue([study]),
    qidoSeries: jest.fn().mockResolvedValue([series]),
    wadoImportSeries: jest.fn().mockResolvedValue(summary),
    stowExportDataset: jest.fn().mockResolvedValue(stowResult),
    listDatasets: jest.fn().mockResolvedValue([]),
    ...overrides,
  }) as unknown as MriApi;

describe('DicomwebTemplate', () => {
  it('lists registered servers with their urls', async () => {
    render(<DicomwebTemplate api={createApi()} />);
    expect(
      await screen.findByTestId(`server-select-${server.id}`)
    ).toBeInTheDocument();
    expect(screen.getByText('http://pacs.local/dicom-web')).toBeInTheDocument();
  });

  it('adds a server and reloads the list', async () => {
    const api = createApi();
    render(<DicomwebTemplate api={api} />);
    fireEvent.change(await screen.findByTestId('server-name'), {
      target: { value: 'Research' },
    });
    fireEvent.change(screen.getByTestId('server-url'), {
      target: { value: 'https://research.local' },
    });
    fireEvent.click(screen.getByTestId('server-add'));
    await waitFor(() =>
      expect(api.addDicomwebServer).toHaveBeenCalledWith(
        'Research',
        'https://research.local',
        ''
      )
    );
  });

  it('shows validation errors from the backend', async () => {
    const api = createApi({
      addDicomwebServer: jest.fn().mockRejectedValue(new Error('bad url')),
    });
    render(<DicomwebTemplate api={api} />);
    fireEvent.change(await screen.findByTestId('server-name'), {
      target: { value: 'X' },
    });
    fireEvent.change(screen.getByTestId('server-url'), {
      target: { value: 'ftp://x' },
    });
    fireEvent.click(screen.getByTestId('server-add'));
    expect(await screen.findByRole('alert')).toHaveTextContent('bad url');
  });

  it('deletes a server', async () => {
    const api = createApi();
    render(<DicomwebTemplate api={api} />);
    fireEvent.click(await screen.findByTestId(`server-delete-${server.id}`));
    await waitFor(() =>
      expect(api.deleteDicomwebServer).toHaveBeenCalledWith(server.id)
    );
  });

  it('queries studies and expands series for import', async () => {
    const api = createApi();
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.change(screen.getByTestId('qido-patient'), {
      target: { value: 'DOE' },
    });
    fireEvent.click(screen.getByTestId('qido-search'));
    const studyButton = await screen.findByTestId(`study-${study.studyUid}`);
    expect(api.qidoStudies).toHaveBeenCalledWith(server.id, 'DOE');
    fireEvent.click(studyButton);
    const importButton = await screen.findByTestId(
      `series-import-${series.seriesUid}`
    );
    fireEvent.click(importButton);
    expect(await screen.findByTestId('import-result')).toHaveTextContent(
      'Imported 176 file(s) into 1 series.'
    );
    expect(api.wadoImportSeries).toHaveBeenCalledWith(
      server.id,
      study.studyUid,
      series.seriesUid
    );
  });

  it('exports a dataset via STOW-RS', async () => {
    const api = createApi({
      listDatasets: jest
        .fn()
        .mockResolvedValue([
          { id: 'dataset://a', name: 'Brain MR', path: '/tmp/a' },
        ]),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.change(screen.getByTestId('export-dataset'), {
      target: { value: 'dataset://a' },
    });
    fireEvent.click(screen.getByTestId('export-run'));
    expect(await screen.findByTestId('stow-result')).toHaveTextContent(
      'Stored 2 instance(s).'
    );
    expect(api.stowExportDataset).toHaveBeenCalledWith(
      server.id,
      'dataset://a'
    );
  });

  it('shows an error when QIDO search fails', async () => {
    const api = createApi({
      qidoStudies: jest.fn().mockRejectedValue(new Error('unreachable')),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.click(screen.getByTestId('qido-search'));
    expect(await screen.findByRole('alert')).toHaveTextContent('unreachable');
  });
});

describe('DicomwebTemplate edge cases', () => {
  it('shows an empty message when no servers are registered', async () => {
    render(
      <DicomwebTemplate
        api={createApi({
          listDicomwebServers: jest.fn().mockResolvedValue([]),
        })}
      />
    );
    expect(await screen.findByText('No servers yet.')).toBeInTheDocument();
  });

  it('renders fallback labels when QIDO fields are missing', async () => {
    const api = createApi({
      qidoStudies: jest
        .fn()
        .mockResolvedValue([
          {
            studyUid: '9.9',
            patientName: '',
            studyDate: '',
            studyDescription: '',
          },
        ]),
      qidoSeries: jest
        .fn()
        .mockResolvedValue([
          {
            seriesUid: '8.8',
            seriesDescription: '',
            modality: '',
            instanceCount: 0,
          },
        ]),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.click(screen.getByTestId('qido-search'));
    fireEvent.click(await screen.findByTestId('study-9.9'));
    expect(await screen.findByTestId('series-import-8.8')).toBeInTheDocument();
    expect(screen.getByText('(no name)')).toBeInTheDocument();
    expect(screen.getByText('9.9')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('reports import failures', async () => {
    const api = createApi({
      wadoImportSeries: jest
        .fn()
        .mockRejectedValue(new Error('download failed')),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.click(screen.getByTestId('qido-search'));
    fireEvent.click(await screen.findByTestId(`study-${study.studyUid}`));
    fireEvent.click(
      await screen.findByTestId(`series-import-${series.seriesUid}`)
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'download failed'
    );
  });

  it('reports series listing failures', async () => {
    const api = createApi({
      qidoSeries: jest.fn().mockRejectedValue(new Error('series query failed')),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.click(screen.getByTestId('qido-search'));
    fireEvent.click(await screen.findByTestId(`study-${study.studyUid}`));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'series query failed'
    );
  });

  it('reports export failures and partial stores', async () => {
    const api = createApi({
      listDatasets: jest
        .fn()
        .mockResolvedValue([
          { id: 'dataset://a', name: 'Brain MR', path: '/tmp/a' },
        ]),
      stowExportDataset: jest
        .fn()
        .mockResolvedValueOnce({ stored: 1, failed: 1 })
        .mockRejectedValueOnce(new Error('upload rejected')),
    });
    render(<DicomwebTemplate api={api} />);
    await screen.findByTestId(`server-select-${server.id}`);
    fireEvent.change(screen.getByTestId('qido-server'), {
      target: { value: server.id },
    });
    fireEvent.change(screen.getByTestId('export-dataset'), {
      target: { value: 'dataset://a' },
    });
    fireEvent.click(screen.getByTestId('export-run'));
    expect(await screen.findByTestId('stow-result')).toHaveTextContent(
      'Stored 1 instance(s), 1 failed.'
    );
    fireEvent.click(screen.getByTestId('export-run'));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'upload rejected'
    );
  });

  it('reports server deletion failures', async () => {
    const api = createApi({
      deleteDicomwebServer: jest.fn().mockRejectedValue(new Error('locked')),
    });
    render(<DicomwebTemplate api={api} />);
    fireEvent.click(await screen.findByTestId(`server-delete-${server.id}`));
    expect(await screen.findByRole('alert')).toHaveTextContent('locked');
  });

  it('reports load failures', async () => {
    render(
      <DicomwebTemplate
        api={createApi({
          listDicomwebServers: jest
            .fn()
            .mockRejectedValue(new Error('offline')),
        })}
      />
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('offline');
  });
});
