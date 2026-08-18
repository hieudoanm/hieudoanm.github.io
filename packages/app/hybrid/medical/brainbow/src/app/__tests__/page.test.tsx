import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import ViewerPage from '@/app/page';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import { createProject, imageToProjectImage } from '@/lib/projects/bundle';
import { viewerStore } from '@/lib/store/viewerStore';
import { analyzeRaster } from '@/lib/analysis/analyze';
import { analyzeBatch } from '@/lib/analysis/batch';
import { downloadBlob, downloadText } from '@/lib/io/dom';
import { loadImageFiles } from '@/lib/image/load';
import { nativeNotify, readLaunchProject } from '@/lib/native';
import { blobToFile, shareFiles, shareText } from '@/lib/share/share';
import { flattenAnnotations, rasterToBlob } from '@/lib/export/raster';
import { exportWebViewer } from '@/lib/export/web';
import { saveProject } from '@/lib/projects/io';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { ChannelRaster, ImageRaster, StackRaster } from '@/types/image';

jest.mock('@/lib/io/dom', () => ({
  downloadBlob: jest.fn(),
  downloadText: jest.fn(),
}));
jest.mock('@/lib/share/share', () => ({
  blobToFile: jest.fn(() => new File(['x'], 'blob.png')),
  shareFiles: jest.fn(async () => undefined),
  shareText: jest.fn(async () => undefined),
}));
jest.mock('@/lib/export/raster', () => ({
  flattenAnnotations: jest.fn((raster: ImageRaster) => raster),
  rasterToBlob: jest.fn(async () => new Blob(['png'])),
}));
jest.mock('@/lib/export/web', () => ({
  exportWebViewer: jest.fn(() => '<!doctype html>'),
}));
jest.mock('@/lib/image/load', () => ({
  loadChannelImageFile: jest.fn(),
  loadImageFiles: jest.fn(async () => []),
}));
jest.mock('@/lib/native', () => ({
  nativeNotify: jest.fn(),
  readLaunchProject: jest.fn(async () => null),
}));
jest.mock('@/lib/projects/io', () => ({
  saveProject: jest.fn(async () => true),
}));
jest.mock('@/lib/analysis/analyze', () => ({
  analyzeRaster: jest.fn(),
}));
jest.mock('@/lib/analysis/batch', () => ({
  analyzeBatch: jest.fn(),
}));
jest.mock('@/data/sample', () => ({
  createSampleRaster: jest.fn(() => ({
    width: 4,
    height: 4,
    data: new Uint8ClampedArray(4 * 4 * 4),
  })),
  SAMPLE_NAME: 'demo-brainbow.tif',
}));

const RASTER_WIDTH = 4;
const RASTER_HEIGHT = 4;
const RASTER_PIXELS = RASTER_WIDTH * RASTER_HEIGHT;

const analyzeRasterMock = analyzeRaster as jest.MockedFunction<
  typeof analyzeRaster
>;
const analyzeBatchMock = analyzeBatch as jest.MockedFunction<
  typeof analyzeBatch
>;
const loadImageFilesMock = loadImageFiles as jest.MockedFunction<
  typeof loadImageFiles
>;
const readLaunchProjectMock = readLaunchProject as jest.MockedFunction<
  typeof readLaunchProject
>;

const MOCK_ANALYSIS: ImageAnalysis = {
  k: 2,
  centers: [
    { r: 255, g: 0, b: 48 },
    { r: 0, g: 200, b: 83 },
  ],
  classified: new Uint8Array(16),
  counts: [16, 0],
  regions: [1, 0],
  regionStats: [
    {
      id: 0,
      cluster: 0,
      area: 16,
      meanIntensity: 120.456,
      centroidX: 2,
      centroidY: 2,
      minX: 0,
      minY: 0,
      maxX: 3,
      maxY: 3,
    },
  ],
  summary: {
    totalPixels: 16,
    diversity: 1,
    clusters: [
      {
        index: 0,
        color: { r: 255, g: 0, b: 48 },
        pixelCount: 16,
        areaCoverage: 1,
        regionCount: 1,
      },
      {
        index: 1,
        color: { r: 0, g: 200, b: 83 },
        pixelCount: 0,
        areaCoverage: 0,
        regionCount: 0,
      },
    ],
  },
};

const MOCK_BATCH = {
  results: [MOCK_ANALYSIS],
  aggregate: {
    imageCount: 1,
    totalPixels: 16,
    totalRegions: 1,
    meanDiversity: 1,
  },
};

const COMPARE_RASTER: ImageRaster = {
  width: 4,
  height: 4,
  data: new Uint8ClampedArray(4 * 4 * 4),
};

const openAnalysisTab = (): void => {
  fireEvent.click(screen.getByRole('tab', { name: 'Analysis' }));
};

const openLayersTab = (): void => {
  fireEvent.click(screen.getByRole('tab', { name: 'Layers' }));
};

type PointerInit = {
  pointerId: number;
  clientX: number;
  clientY: number;
};

const pointerEvent = (
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  { pointerId, clientX, clientY }: PointerInit
): MouseEvent => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
  });
  Object.defineProperty(event, 'pointerId', { value: pointerId });
  return event;
};

const click = (canvas: HTMLElement, x: number, y: number): void => {
  fireEvent(
    canvas,
    pointerEvent('pointerdown', { pointerId: 1, clientX: x, clientY: y })
  );
};

const clickWithGap = (canvas: HTMLElement, x: number, y: number): void => {
  click(canvas, x, y);
  act(() => {
    jest.advanceTimersByTime(400);
  });
};

const drawClosedPolygon = (
  canvas: HTMLElement,
  points: Array<[number, number]>
): void => {
  for (const [x, y] of points) {
    clickWithGap(canvas, x, y);
  }
  const [lastX, lastY] = points[points.length - 1];
  click(canvas, lastX, lastY);
  click(canvas, lastX, lastY);
};

describe('ViewerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    viewerStore.take();
    readLaunchProjectMock.mockResolvedValue(null);
    loadImageFilesMock.mockResolvedValue([COMPARE_RASTER]);
    analyzeRasterMock.mockReturnValue(MOCK_ANALYSIS);
    analyzeBatchMock.mockResolvedValue(MOCK_BATCH);
  });

  it('opens the demo dataset when no project is pending', async () => {
    render(<ViewerPage />);
    expect(await screen.findByText('demo-brainbow.tif')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save project' })).toBeEnabled();
  });

  it('loads a pending project transfer into the viewer', async () => {
    const raster: ImageRaster = {
      width: 2,
      height: 2,
      data: new Uint8ClampedArray(2 * 2 * 4),
    };
    const project = createProject(
      'pending-project',
      [imageToProjectImage(raster, 'pending-image', null)],
      DEFAULT_CHANNEL_STATES,
      []
    );
    viewerStore.setProject(project);
    render(<ViewerPage />);
    expect(await screen.findByText('pending-project')).toBeInTheDocument();
    expect(readLaunchProject).not.toHaveBeenCalled();
  });

  it('loads a pending stack and navigates through its slices', async () => {
    const plane = {
      id: 'r',
      name: 'Red',
      data: new Uint8ClampedArray([128, 64, 32, 16]),
    };
    const channelRaster: ChannelRaster = {
      width: 2,
      height: 2,
      planes: [plane],
    };
    const stack: StackRaster = {
      width: 2,
      height: 2,
      slices: [
        { id: 's0', z: 0, frame: null, planes: [plane] },
        { id: 's1', z: 1, frame: null, planes: [plane] },
      ],
    };
    viewerStore.setStack(channelRaster, stack, 'stack-demo', null);
    render(<ViewerPage />);

    expect(await screen.findByText('Slice 1 / 2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous slice' })
    ).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Next slice' }));
    expect(await screen.findByText('Slice 2 / 2')).toBeInTheDocument();
    expect(await screen.findByText('stack-demo (slice 2)')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Slice index'), {
      target: { value: '9' },
    });
    expect(screen.getByText('Slice 2 / 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Analyze stack' }));
    await waitFor(() =>
      expect(nativeNotify).toHaveBeenCalledWith(
        'Stack analysis complete',
        'Analyzed 1 slices'
      )
    );
  });

  it('saves the current image as a brainbow project', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');
    fireEvent.click(screen.getByRole('button', { name: 'Save project' }));
    await waitFor(() => expect(saveProject).toHaveBeenCalledTimes(1));
    const project = (saveProject as jest.Mock).mock.calls[0][0];
    expect(project.name).toBe('demo-brainbow.tif');
    expect(project.images[0]).toMatchObject({
      width: 4,
      height: 4,
    });
  });

  it('commits, restores, and deletes version history snapshots', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');

    fireEvent.click(
      screen.getByRole('button', { name: 'Open version history' })
    );
    const dialog = screen.getByRole('dialog', { name: 'Version history' });
    expect(screen.getByText(/No snapshots yet\./)).toBeInTheDocument();

    const messageInput = within(dialog).getByLabelText('Snapshot message');
    expect(
      within(dialog).getByRole('button', { name: 'Save snapshot' })
    ).toBeDisabled();
    fireEvent.change(messageInput, { target: { value: 'first snapshot' } });
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Save snapshot' })
    );
    expect(await screen.findByText('first snapshot')).toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Restore first snapshot' })
    );
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Version history' })
      ).not.toBeInTheDocument()
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Open version history' })
    );
    fireEvent.click(
      within(screen.getByRole('dialog', { name: 'Version history' })).getByRole(
        'button',
        { name: 'Delete first snapshot' }
      )
    );
    expect(await screen.findByText(/No snapshots yet\./)).toBeInTheDocument();
  });

  it('runs single-image analysis and exports every result format', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');
    openAnalysisTab();

    fireEvent.click(
      screen.getByRole('button', { name: 'Run analysis on current image' })
    );
    await screen.findByRole('button', { name: 'Export CSV' });

    fireEvent.click(screen.getByRole('button', { name: 'Export CSV' }));
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-clusters.csv',
      expect.stringContaining('image'),
      'text/csv'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Export JSON' }));
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-summary.json',
      expect.stringContaining('totalPixels')
    );

    fireEvent.click(screen.getByRole('button', { name: 'Export regions CSV' }));
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-regions.csv',
      expect.stringContaining('areaPixels'),
      'text/csv'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Export PNG' }));
    await waitFor(() => expect(flattenAnnotations).toHaveBeenCalled());
    await waitFor(() => expect(rasterToBlob).toHaveBeenCalled());
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'demo-brainbow.tif-annotated.png'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open report' }));
    expect(
      screen.getByRole('dialog', { name: 'Analysis report' })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('heading', {
        name: 'demo-brainbow.tif analysis report',
      })
    ).not.toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Share report' }));
    await waitFor(() =>
      expect(shareText).toHaveBeenCalledWith(
        'demo-brainbow.tif analysis report',
        expect.stringContaining('html')
      )
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close report' }));
    expect(
      screen.queryByRole('dialog', { name: 'Analysis report' })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Share exports' }));
    await waitFor(() => expect(shareFiles).toHaveBeenCalled());
    expect(shareFiles).toHaveBeenCalledWith('demo-brainbow.tif exports', [
      expect.any(File),
      expect.any(File),
    ]);
    expect(blobToFile).toHaveBeenCalledTimes(2);
  });

  it('toggles the density heatmap overlay and changes its radius', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');
    openAnalysisTab();

    fireEvent.click(
      screen.getByRole('button', { name: 'Run analysis on current image' })
    );
    await screen.findByRole('button', { name: 'Export CSV' });

    const densityToggle = screen.getByRole('checkbox', {
      name: 'Density heatmap overlay',
    });
    expect(densityToggle).not.toBeChecked();
    fireEvent.click(densityToggle);
    expect(
      screen.getByRole('checkbox', { name: 'Density heatmap overlay' })
    ).toBeChecked();

    fireEvent.change(screen.getByLabelText('Density radius'), {
      target: { value: '48' },
    });
    expect(screen.getByLabelText('Density radius')).toHaveValue('48');
  });

  it('analyzes a batch of imported files', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');
    openAnalysisTab();

    const sidebar = screen.getByLabelText('Viewer sidebar');
    const batchInput = sidebar.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    fireEvent.change(batchInput, { target: { files: [file] } });

    expect(await screen.findByText('1 image analyzed')).toBeInTheDocument();
    expect(nativeNotify).toHaveBeenCalledWith(
      'Batch analysis complete',
      'Analyzed 1 images'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Export CSV' }));
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-clusters.csv',
      expect.stringContaining('image'),
      'text/csv'
    );
  });

  it('does nothing when a batch import returns no images', async () => {
    loadImageFilesMock.mockResolvedValueOnce([]);
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');
    openAnalysisTab();

    const sidebar = screen.getByLabelText('Viewer sidebar');
    const batchInput = sidebar.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    fireEvent.change(batchInput, { target: { files: [file] } });

    expect(screen.queryByText('1 image analyzed')).not.toBeInTheDocument();
    expect(nativeNotify).not.toHaveBeenCalled();
  });

  it('loads a compare image in side and swipe modes', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');

    const compareInput = screen.getByTestId(
      'compare-input'
    ) as HTMLInputElement;
    const file = new File(['x'], 'compare.png', { type: 'image/png' });
    fireEvent.change(compareInput, { target: { files: [file] } });

    expect(await screen.findByTestId('compare-pane')).toBeInTheDocument();
    expect(screen.queryByTestId('minimap')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Compare mode: swipe divider' })
    );
    expect(screen.getByTestId('compare-divider')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Clear compare image' })
    );
    expect(screen.queryByTestId('compare-pane')).not.toBeInTheDocument();
  });

  it('skips an empty compare import', async () => {
    loadImageFilesMock.mockResolvedValueOnce([]);
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');

    const compareInput = screen.getByTestId(
      'compare-input'
    ) as HTMLInputElement;
    const file = new File(['x'], 'compare.png', { type: 'image/png' });
    fireEvent.change(compareInput, { target: { files: [file] } });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByTestId('compare-pane')).not.toBeInTheDocument();
  });

  it('adds an annotation layer, draws a polygon, and exports layer formats', async () => {
    jest.useFakeTimers();
    render(<ViewerPage />);
    expect(await screen.findByText('demo-brainbow.tif')).toBeInTheDocument();

    openLayersTab();
    fireEvent.click(screen.getByRole('button', { name: 'Add layer' }));
    expect(screen.getByText('Layer 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Polygon tool' }));
    const canvas = screen.getByTestId('annotator-canvas');
    drawClosedPolygon(canvas, [
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200],
    ]);
    expect(screen.getByText('1 annotation')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Export ImageJ ROI set' })
    );
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'demo-brainbow.tif-annotations.zip'
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Export annotations as GeoJSON' })
    );
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-annotations.geojson',
      expect.stringContaining('"type":'),
      'application/geo+json'
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Export annotations as CSV' })
    );
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-annotations.csv',
      expect.stringContaining('layer,color,kind,points'),
      'text/csv'
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Export annotations as SVG figure' })
    );
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow.tif-figure.svg',
      expect.stringContaining('<svg'),
      'image/svg+xml'
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Export read-only web viewer' })
    );
    expect(exportWebViewer).toHaveBeenCalled();
    expect(downloadText).toHaveBeenCalledWith(
      'demo-brainbow-tif-viewer.html',
      '<!doctype html>',
      'text/html'
    );

    jest.useRealTimers();
  });

  it('rotates and flips the canvas through the toolbar', async () => {
    render(<ViewerPage />);
    await screen.findByText('demo-brainbow.tif');

    fireEvent.click(screen.getByRole('button', { name: 'Rotate clockwise' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Rotate counterclockwise' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Flip horizontally' }));
    fireEvent.click(screen.getByRole('button', { name: 'Flip vertically' }));
    expect(
      screen.getByRole('button', { name: 'Rotate clockwise' })
    ).toBeEnabled();
  });
});
