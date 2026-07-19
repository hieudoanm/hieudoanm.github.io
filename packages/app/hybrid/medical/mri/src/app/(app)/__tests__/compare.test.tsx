import { render, screen } from '@testing-library/react';
import { api } from '@/lib/api/client';

const searchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
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

describe('ComparePage', () => {
  it('warns when series are missing', async () => {
    searchParams.delete('left');
    searchParams.delete('right');
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    expect(
      screen.getByText(/Provide two series to compare/)
    ).toBeInTheDocument();
  });

  it('warns when only one series is provided', async () => {
    searchParams.set('left', 'series://1/s1');
    searchParams.delete('right');
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    expect(
      screen.getByText(/Provide two series to compare/)
    ).toBeInTheDocument();
  });

  it('renders the comparison view for two series', async () => {
    searchParams.set('left', 'series://1/s1');
    searchParams.set('right', 'series://1/s2');
    const seriesMeta = (id: string) => ({
      series: {
        id,
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
        voxelX: 1,
        voxelY: 1,
        voxelZ: 1,
        sliceThickness: 1,
        orientation: '',
        teMs: 0,
        trMs: 0,
        flipAngle: 0,
        fieldStrengthT: 0,
        manufacturer: '',
        model: '',
      },
      normalized: {
        modality: 'MR',
        contrast: null,
        sequenceFamily: null,
        dimensionality: null,
        inference: 'inferred-from-naming',
      },
      originalTags: {},
      classification: [],
    });
    (api.getSeriesMetadata as jest.Mock).mockImplementation((id: string) =>
      Promise.resolve(seriesMeta(id))
    );
    (api.compareCompatibility as jest.Mock).mockResolvedValue({
      compatible: false,
      reasons: ['matrix differs: 2x2 vs 4x4'],
    });
    (api.readSlice as jest.Mock).mockResolvedValue(new ArrayBuffer(8));
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    await screen.findByText('Compare series');
    expect(
      screen.getByText(/Geometry differs — registration is not applied yet/)
    ).toBeInTheDocument();
  });
});
