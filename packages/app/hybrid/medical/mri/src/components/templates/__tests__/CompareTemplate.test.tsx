import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CompareTemplate } from '@/components/templates/CompareTemplate';
import type { MriApi } from '@/lib/api/client';
import type { SeriesMetadata } from '@/lib/api/types';

const makeMetadata = (id: string, rows = 2, columns = 2): SeriesMetadata => ({
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
    rows,
    columns,
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

const sliceBuffer = (value: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(2 * 2 * 2);
  const view = new DataView(buffer);
  for (let index = 0; index < 4; index += 1) {
    view.setUint16(index * 2, value + index, true);
  }
  return buffer;
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    getSeriesMetadata: jest
      .fn()
      .mockImplementation((id: string) => Promise.resolve(makeMetadata(id))),
    compareCompatibility: jest
      .fn()
      .mockResolvedValue({ compatible: true, reasons: [] }),
    readSlice: jest
      .fn()
      .mockImplementation((id: string, index: number) =>
        Promise.resolve(sliceBuffer(id.endsWith('s2') ? 50 : 0 + index))
      ),
    ...overrides,
  }) as unknown as MriApi;

describe('CompareTemplate', () => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  let putImageData: jest.Mock;

  beforeEach(() => {
    putImageData = jest.fn();
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

  it('renders both series with synchronized controls', async () => {
    render(
      <CompareTemplate
        api={createApi()}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => {
      expect(screen.getByText('Baseline')).toBeInTheDocument();
      expect(screen.getByText('Follow-up')).toBeInTheDocument();
    });
    expect(screen.getByTestId('left-canvas')).toBeInTheDocument();
    expect(screen.getByTestId('right-canvas')).toBeInTheDocument();
    expect(screen.getByTestId('diff-canvas')).toBeInTheDocument();
    expect(screen.getByText(/mean \d/)).toBeInTheDocument();
  });

  it('warns when geometry differs', async () => {
    render(
      <CompareTemplate
        api={createApi({
          compareCompatibility: jest.fn().mockResolvedValue({
            compatible: false,
            reasons: ['matrix differs'],
          }),
        })}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => {
      expect(screen.getByTestId('compatibility-warning')).toHaveTextContent(
        'matrix differs'
      );
    });
  });

  it('navigates slices for both sides', async () => {
    const api = createApi();
    render(
      <CompareTemplate
        api={api}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => screen.getByText('Baseline'));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(api.readSlice).toHaveBeenCalledWith('series://a', 1);
      expect(api.readSlice).toHaveBeenCalledWith('series://b', 1);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    await waitFor(() => {
      expect(api.readSlice).toHaveBeenCalledWith('series://b', 0);
    });
  });

  it('jumps to a slice through the slider', async () => {
    const api = createApi();
    render(
      <CompareTemplate
        api={api}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => screen.getByText('Baseline'));
    fireEvent.change(screen.getByTestId('compare-slice-slider'), {
      target: { value: '1' },
    });
    await waitFor(() => {
      expect(api.readSlice).toHaveBeenCalledWith('series://b', 1);
    });
  });

  it('adjusts the window width', async () => {
    render(
      <CompareTemplate
        api={createApi()}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => screen.getByText('Baseline'));
    const slider = screen.getByTestId(
      'compare-window-slider'
    ) as HTMLInputElement;
    expect(slider.value).not.toBe('1');
    fireEvent.change(slider, { target: { value: '1' } });
    expect(slider.value).toBe('1');
  });

  it('places a crosshair on click', async () => {
    render(
      <CompareTemplate
        api={createApi()}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => screen.getByTestId('left-canvas'));
    const drawsBefore = putImageData.mock.calls.length;
    fireEvent.click(screen.getByTestId('left-canvas').parentElement!, {
      clientX: 10,
      clientY: 20,
    });
    await waitFor(() => {
      expect(putImageData.mock.calls.length).toBeGreaterThan(drawsBefore);
    });
  });

  it('reports slice loading failures', async () => {
    render(
      <CompareTemplate
        api={createApi({
          readSlice: jest.fn().mockRejectedValue(new Error('slice boom')),
        })}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('slice boom');
    });
  });

  it('reports load errors', async () => {
    render(
      <CompareTemplate
        api={createApi({
          getSeriesMetadata: jest
            .fn()
            .mockRejectedValue(new Error('meta boom')),
        })}
        leftSeriesId="series://a"
        rightSeriesId="series://b"
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('meta boom');
    });
  });
});
