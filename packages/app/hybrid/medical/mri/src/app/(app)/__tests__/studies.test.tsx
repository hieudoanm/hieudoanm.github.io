import { render, screen } from '@testing-library/react';
import StudiesPage from '@/app/(app)/studies/page';
import { api } from '@/lib/api/client';

const searchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}));

jest.mock('@/lib/api/client', () => ({
  DESKTOP_REQUIRED_MESSAGE: 'desktop required',
  isDesktopRuntime: () => true,
  api: {
    pickScanFiles: jest.fn(),
    importFiles: jest.fn(),
    listDatasets: jest.fn(),
    getDatasetDetail: jest.fn(),
    deleteDataset: jest.fn(),
    getSeriesMetadata: jest.fn(),
    getProvenance: jest.fn(),
    readSlice: jest.fn(),
    getStudyAnalysis: jest.fn(),
    listProtocols: jest.fn(),
    createProtocol: jest.fn(),
    deleteProtocol: jest.fn(),
    validateDataset: jest.fn(),
    runQc: jest.fn(),
    compareCompatibility: jest.fn(),
    createPipeline: jest.fn(),
    listPipelines: jest.fn().mockResolvedValue([]),
    deletePipeline: jest.fn(),
    runPipeline: jest.fn(),
    listJobs: jest.fn().mockResolvedValue([]),
    getJob: jest.fn(),
    cancelJob: jest.fn(),
    retryJob: jest.fn(),
    registerModel: jest.fn(),
    listModels: jest.fn().mockResolvedValue([]),
    deleteModel: jest.fn(),
    isRuntimeAvailable: jest.fn().mockResolvedValue(false),
    runModel: jest.fn(),
    addDicomwebServer: jest.fn(),
    listDicomwebServers: jest.fn().mockResolvedValue([]),
    deleteDicomwebServer: jest.fn().mockResolvedValue(undefined),
    qidoStudies: jest.fn().mockResolvedValue([]),
    qidoSeries: jest.fn().mockResolvedValue([]),
    wadoImportSeries: jest.fn(),
    stowExportDataset: jest.fn(),
  },
}));

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

describe('StudiesPage', () => {
  it('warns when no dataset is selected', () => {
    searchParams.delete('dataset');
    render(<StudiesPage />);
    expect(screen.getByText(/No dataset selected/)).toBeInTheDocument();
  });

  it('renders the studies browser for a dataset', async () => {
    searchParams.set('dataset', 'dataset://1');
    (api.getDatasetDetail as jest.Mock).mockResolvedValue({
      dataset: { id: 'dataset://1', name: 'Study A' },
      studies: [],
      series: [
        {
          id: 'series://1/s1',
          datasetId: 'dataset://1',
          studyUid: '',
          studyDate: '',
          seriesUid: '9.9.1',
          modality: 'MR',
          seriesDescription: 'T1',
          kind: 'nifti',
          fileCount: 1,
          rows: 2,
          columns: 2,
          sliceCount: 2,
          bitsAllocated: 16,
          signedPixels: false,
          voxelX: 0,
          voxelY: 0,
          voxelZ: 0,
          sliceThickness: 0,
          orientation: '',
          teMs: 0,
          trMs: 0,
          flipAngle: 0,
          fieldStrengthT: 0,
          manufacturer: '',
          model: '',
        },
      ],
    });
    (api.getProvenance as jest.Mock).mockResolvedValue([]);
    render(<StudiesPage />);
    await screen.findByText('Study A');
    expect(screen.getByText('T1')).toBeInTheDocument();
  });
});
