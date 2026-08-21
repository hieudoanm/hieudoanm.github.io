import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import type { MriApi } from '@/lib/api/client';
import type { SeriesMetadata } from '@/lib/api/types';

const metadata: SeriesMetadata = {
  series: {
    id: 'series://1/s1',
    datasetId: 'dataset://1',
    studyUid: '',
    studyDate: '',
    seriesUid: '9.9.1',
    modality: 'MR',
    seriesDescription: 'T1 MPRAGE SAG',
    kind: 'nifti',
    fileCount: 1,
    rows: 2,
    columns: 2,
    sliceCount: 3,
    bitsAllocated: 16,
    signedPixels: false,
    voxelX: 1,
    voxelY: 1,
    voxelZ: 1,
    sliceThickness: 1,
    orientation: 'Sagittal',
    teMs: 20,
    trMs: 600,
    flipAngle: 15,
    fieldStrengthT: 3,
    manufacturer: 'Siemens',
    model: 'Prisma',
  },
  normalized: {
    modality: 'MR',
    contrast: 'T1',
    sequenceFamily: 'structural',
    dimensionality: '3D',
    inference: 'inferred-from-naming',
  },
  originalTags: {},
  classification: [
    {
      sequence: 'T1',
      confidence: 0.9,
      evidence: ['description contains "mprage"'],
    },
  ],
};

const sliceBuffer = (value: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(2 * 2 * 2);
  const view = new DataView(buffer);
  for (let index = 0; index < 4; index += 1) {
    view.setUint16(index * 2, value + index, true);
  }
  return buffer;
};

const createApi = (overrides: Partial<MriApi> = {}): MriApi => ({
  pickScanFiles: jest.fn(),
  importFiles: jest.fn(),
  listDatasets: jest.fn(),
  getDatasetDetail: jest.fn(),
  deleteDataset: jest.fn(),
  getSeriesMetadata: jest.fn().mockResolvedValue(metadata),
  getProvenance: jest.fn(),
  readSlice: jest
    .fn()
    .mockImplementation((_seriesId: string, index: number) =>
      Promise.resolve(sliceBuffer(index * 100))
    ),
  getStudyAnalysis: jest.fn(),
  listProtocols: jest.fn(),
  createProtocol: jest.fn(),
  deleteProtocol: jest.fn(),
  validateDataset: jest.fn(),
  runQc: jest.fn(),
  compareCompatibility: jest.fn(),
  ...overrides,
});

describe('ViewerTemplate', () => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    const putImageData = jest.fn();
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      putImageData,
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    class ImageDataMock {
      data: Uint8ClampedArray;
      width: number;
      height: number;
      constructor(data: Uint8ClampedArray, width: number, height: number) {
        this.data = data;
        this.width = width;
        this.height = height;
      }
    }
    (global as unknown as { ImageData: unknown }).ImageData = ImageDataMock;
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    delete (global as unknown as { ImageData?: unknown }).ImageData;
  });

  it('renders the canvas viewport and controls', async () => {
    render(<ViewerTemplate api={createApi()} seriesId="series://1/s1" />);
    await waitFor(() =>
      expect(screen.getByTestId('viewport')).toBeInTheDocument()
    );
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByTestId('slice-slider')).toHaveValue('0');
  });

  it('navigates slices with next/prev buttons', async () => {
    const api = createApi();
    render(<ViewerTemplate api={api} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(screen.getByText('2/3')).toBeInTheDocument());
    expect(api.readSlice).toHaveBeenCalledWith('series://1/s1', 1);
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    await waitFor(() => expect(screen.getByText('1/3')).toBeInTheDocument());
  });

  it('clamps slice navigation to the volume bounds', async () => {
    const api = createApi();
    render(<ViewerTemplate api={api} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    expect(screen.getByText('1/3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(screen.getByText('2/3')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(screen.getByText('3/3')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('3/3')).toBeInTheDocument();
  });

  it('navigates slices with arrow keys', async () => {
    const api = createApi();
    render(<ViewerTemplate api={api} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => expect(screen.getByText('2/3')).toBeInTheDocument());
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    await waitFor(() => expect(screen.getByText('1/3')).toBeInTheDocument());
  });

  it('paints the slice onto the canvas', async () => {
    render(<ViewerTemplate api={createApi()} seriesId="series://1/s1" />);
    await waitFor(() =>
      expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled()
    );
  });

  it('shows an error when a slice fails to load', async () => {
    render(
      <ViewerTemplate
        api={createApi({
          readSlice: jest.fn().mockRejectedValue(new Error('slice boom')),
        })}
        seriesId="series://1/s1"
      />
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('slice boom')
    );
  });

  it('adjusts window width through the slider', async () => {
    render(<ViewerTemplate api={createApi()} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.change(screen.getByTestId('window-slider'), {
      target: { value: '512' },
    });
    expect(screen.getByTestId('window-slider')).toHaveValue('512');
  });

  it('adjusts window center through the slider', async () => {
    render(<ViewerTemplate api={createApi()} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.change(screen.getByTestId('level-slider'), {
      target: { value: '300' },
    });
    expect(screen.getByTestId('level-slider')).toHaveValue('300');
  });

  it('jumps to a slice through the slider', async () => {
    const api = createApi();
    render(<ViewerTemplate api={api} seriesId="series://1/s1" />);
    await waitFor(() => screen.getByTestId('viewport'));
    fireEvent.change(screen.getByTestId('slice-slider'), {
      target: { value: '2' },
    });
    await waitFor(() => {
      expect(api.readSlice).toHaveBeenCalledWith('series://1/s1', 2);
    });
  });

  it('shows an error when metadata fails to load', async () => {
    render(
      <ViewerTemplate
        api={createApi({
          getSeriesMetadata: jest.fn().mockRejectedValue(new Error('boom')),
        })}
        seriesId="series://1/s1"
      />
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('boom')
    );
  });
});
