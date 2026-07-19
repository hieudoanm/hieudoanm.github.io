import { render, screen } from '@testing-library/react';
import { api } from '@/lib/api/client';

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

describe('PipelinesPage', () => {
  it('renders the pipelines workspace with the jobs panel', async () => {
    (api.listPipelines as jest.Mock).mockResolvedValue([]);
    (api.listDatasets as jest.Mock).mockResolvedValue([]);
    const { default: PipelinesPage } =
      await import('@/app/(app)/pipelines/page');
    render(<PipelinesPage />);
    await screen.findByText('Pipelines');
    expect(screen.getByTestId('pipeline-form')).toBeInTheDocument();
    expect(screen.getByTestId('jobs-panel')).toBeInTheDocument();
  });
});
