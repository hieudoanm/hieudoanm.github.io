import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StudiesTemplate } from '@/components/templates/StudiesTemplate';
import type { MriApi } from '@/lib/api/client';
import type { DatasetDetail, SeriesMetadata } from '@/lib/api/types';

const series = {
  id: 'series://1/s1',
  datasetId: 'dataset://1',
  studyUid: '1.2.3',
  studyDate: '20260101',
  seriesUid: '9.9.1',
  modality: 'MR',
  seriesDescription: 'T1 MPRAGE SAG',
  kind: 'dicom' as const,
  fileCount: 3,
  rows: 256,
  columns: 256,
  sliceCount: 3,
  bitsAllocated: 16,
  signedPixels: false,
  voxelX: 1,
  voxelY: 1,
  voxelZ: 1.2,
  sliceThickness: 1.2,
  orientation: 'Sagittal',
  teMs: 20,
  trMs: 600,
  flipAngle: 15,
  fieldStrengthT: 3,
  manufacturer: 'Siemens',
  model: 'Prisma',
};

const detail: DatasetDetail = {
  dataset: {
    id: 'dataset://1',
    name: 'Study A',
    description: '',
    sourcePath: '/tmp/src',
    path: '/tmp/dst',
    createdAt: 0,
    updatedAt: 0,
  },
  studies: [{ studyUid: '1.2.3', studyDate: '20260101', seriesCount: 1 }],
  series: [series],
};

const metadata: SeriesMetadata = {
  series,
  normalized: {
    modality: 'MR',
    contrast: 'T1',
    sequenceFamily: 'structural',
    dimensionality: '3D',
    inference: 'inferred-from-naming',
  },
  originalTags: [{ path: '(0008,0060)', name: 'Modality', value: 'MR' }],
  classification: [
    {
      sequence: 'T1',
      confidence: 0.9,
      evidence: ['description contains "mprage"'],
    },
  ],
};

const createApi = (overrides: Partial<MriApi> = {}): MriApi => ({
  pickScanFiles: jest.fn(),
  importFiles: jest.fn(),
  listDatasets: jest.fn(),
  getDatasetDetail: jest.fn().mockResolvedValue(detail),
  deleteDataset: jest.fn(),
  getSeriesMetadata: jest.fn().mockResolvedValue(metadata),
  getProvenance: jest.fn().mockResolvedValue([
    {
      id: 'artifact://1/provenance-import',
      datasetId: 'dataset://1',
      activity: 'import',
      inputsJson: '[]',
      outputsJson: '["1 series"]',
      parametersJson: '{}',
      software: 'mri 0.0.1',
      createdAt: 0,
    },
  ]),
  readSlice: jest.fn(),
  getStudyAnalysis: jest.fn().mockResolvedValue({
    studyUid: '1.2.3',
    seriesCount: 1,
    modalities: ['MR'],
    contrasts: ['T1'],
    orientations: ['Sagittal'],
    voxelSizes: [[1, 1, 1.2]],
    fieldStrengthT: 3,
    manufacturers: ['Siemens'],
    models: ['Prisma'],
    temporalSeries: 0,
  }),
  listProtocols: jest.fn(),
  createProtocol: jest.fn(),
  deleteProtocol: jest.fn(),
  validateDataset: jest.fn(),
  runQc: jest.fn().mockResolvedValue({
    seriesId: 'series://1/s1',
    datasetId: 'dataset://1',
    checks: [
      {
        id: 'dimensions',
        status: 'pass',
        value: null,
        detail: '256x256 pixels',
      },
    ],
    software: 'mri 0.0.1',
    generatedAt: 0,
  }),
  compareCompatibility: jest.fn(),
  createPipeline: jest.fn(),
  listPipelines: jest.fn().mockResolvedValue([]),
  deletePipeline: jest.fn().mockResolvedValue(undefined),
  runPipeline: jest.fn(),
  listJobs: jest.fn().mockResolvedValue([]),
  getJob: jest.fn(),
  cancelJob: jest.fn().mockResolvedValue(undefined),
  retryJob: jest.fn(),
  registerModel: jest.fn(),
  listModels: jest.fn().mockResolvedValue([]),
  deleteModel: jest.fn().mockResolvedValue(undefined),
  isRuntimeAvailable: jest.fn().mockResolvedValue(false),
  runModel: jest.fn(),
  ...overrides,
});

describe('StudiesTemplate', () => {
  it('renders the dataset with its series', async () => {
    render(<StudiesTemplate api={createApi()} datasetId="dataset://1" />);
    await waitFor(() =>
      expect(screen.getByText('Study A')).toBeInTheDocument()
    );
    expect(screen.getByText('T1 MPRAGE SAG')).toBeInTheDocument();
    expect(screen.getByText('3 slices · 256×256 · 16-bit')).toBeInTheDocument();
  });

  it('expands metadata with normalized concepts and original tags', async () => {
    render(<StudiesTemplate api={createApi()} datasetId="dataset://1" />);
    await waitFor(() =>
      expect(screen.getByText('T1 MPRAGE SAG')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Metadata' }));
    await waitFor(() =>
      expect(screen.getByTestId('metadata-panel')).toBeInTheDocument()
    );
    expect(screen.getByText('inferred from naming')).toBeInTheDocument();
    expect(
      JSON.parse(screen.getByTestId('original-tags-json').textContent ?? 'null')
    ).toEqual(metadata.originalTags);
  });

  it('links each series to the viewer', async () => {
    render(<StudiesTemplate api={createApi()} datasetId="dataset://1" />);
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /View/ })).toHaveAttribute(
        'href',
        '/viewer?series=series%3A%2F%2F1%2Fs1'
      )
    );
  });

  it('lists provenance records', async () => {
    render(<StudiesTemplate api={createApi()} datasetId="dataset://1" />);
    await waitFor(() =>
      expect(screen.getByText(/import · mri 0.0.1/)).toBeInTheDocument()
    );
  });

  it('shows an error when loading fails', async () => {
    render(
      <StudiesTemplate
        api={createApi({
          getDatasetDetail: jest.fn().mockRejectedValue(new Error('boom')),
        })}
        datasetId="dataset://1"
      />
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('boom')
    );
  });

  it('stringifies non-error load failures', async () => {
    render(
      <StudiesTemplate
        api={createApi({
          getDatasetDetail: jest.fn().mockRejectedValue('plain failure'),
        })}
        datasetId="dataset://1"
      />
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('plain failure')
    );
  });

  it('falls back to the series uid when the description is empty', async () => {
    const api = createApi();
    (api.getDatasetDetail as jest.Mock).mockResolvedValue({
      dataset: { id: 'dataset://1', name: 'Study A' },
      studies: [],
      series: [{ ...series, seriesDescription: '' }],
    });
    render(<StudiesTemplate api={api} datasetId="dataset://1" />);
    await waitFor(() => expect(screen.getByText('9.9.1')).toBeInTheDocument());
  });

  it('collapses the metadata panel when toggled twice', async () => {
    render(<StudiesTemplate api={createApi()} datasetId="dataset://1" />);
    await waitFor(() =>
      expect(screen.getByText('T1 MPRAGE SAG')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Metadata' }));
    await waitFor(() =>
      expect(screen.getByTestId('metadata-panel')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Metadata' }));
    await waitFor(() =>
      expect(screen.queryByTestId('metadata-panel')).toBeNull()
    );
  });
});
