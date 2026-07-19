import { fireEvent, render, screen } from '@testing-library/react';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';

jest.mock('@/lib/native', () => ({
  isTauri: jest.fn(() => false),
}));

describe('ViewerTemplate', () => {
  const props = {
    raster: {
      width: 2,
      height: 1,
      data: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]),
    },
    name: 'scan.png',
    channels: DEFAULT_CHANNEL_STATES,
    planes: [
      { id: 'r', name: 'Red', data: new Uint8ClampedArray(0) },
      { id: 'g', name: 'Green', data: new Uint8ClampedArray(0) },
      { id: 'b', name: 'Blue', data: new Uint8ClampedArray(0) },
    ],
    analyses: null,
    transform: { scale: 1, offsetX: 0, offsetY: 0 },
    size: { width: 800, height: 600 },
    onOpenDemo: jest.fn(),
    onSetSize: jest.fn(),
    onFitView: jest.fn(),
    onZoomIn: jest.fn(),
    onZoomOut: jest.fn(),
    onRotateCW: jest.fn(),
    onRotateCCW: jest.fn(),
    onFlipX: jest.fn(),
    onFlipY: jest.fn(),
    onTransformChange: jest.fn(),
    onToggleChannel: jest.fn(),
    onSetChannelOpacity: jest.fn(),
    onSetChannelSourcePlane: jest.fn(),
    onAddChannel: jest.fn(),
    calibration: { pixelsPerMicron: null },
    onCalibrationChange: jest.fn(),
    onSaveProject: jest.fn(),
    layers: [],
    activeLayer: null,
    tool: 'pan' as const,
    canUndo: false,
    canRedo: false,
    onToolChange: jest.fn(),
    onAddLayer: jest.fn(),
    onRemoveLayer: jest.fn(),
    onExportRoiZip: jest.fn(),
    onExportGeoJson: jest.fn(),
    onExportAnnotationsCsv: jest.fn(),
    onExportSvg: jest.fn(),
    onExportWebViewer: jest.fn(),
    onToggleLayerVisibility: jest.fn(),
    onSetLayerColor: jest.fn(),
    onSetActiveLayer: jest.fn(),
    onAddAnnotation: jest.fn(),
    onRemoveAnnotations: jest.fn(),
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    snapEnabled: false,
    gridVisible: false,
    onToggleSnap: jest.fn(),
    onToggleGrid: jest.fn(),
    compareRaster: null,
    compareMode: 'off' as const,
    compareDivider: 0.5,
    onCompareModeChange: jest.fn(),
    onCompareDividerChange: jest.fn(),
    onLoadCompareFiles: jest.fn(),
    onClearCompare: jest.fn(),
    historyOpen: false,
    onOpenHistory: jest.fn(),
    onCloseHistory: jest.fn(),
    historySnapshots: [],
    onHistoryCommit: jest.fn(),
    onHistoryRestore: jest.fn(),
    onHistoryRemove: jest.fn(),
    analysisStatus: 'idle' as const,
    analysisProgress: 0,
    analysisError: null,
    k: 5,
    analysisResult: null,
    batchResult: null,
    presets: [
      {
        id: 'p1',
        name: 'Fast',
        options: { k: 3, iterations: 5, stride: 8, minRegionSize: 8 },
      },
    ],
    onApplyPreset: jest.fn(),
    onSavePreset: jest.fn(),
    onDeletePreset: jest.fn(),
    densityOverlay: null,
    showDensity: false,
    densityRadius: 24,
    onToggleDensity: jest.fn(),
    onDensityRadiusChange: jest.fn(),
    onSetK: jest.fn(),
    onRunSingle: jest.fn(),
    onBatchFiles: jest.fn(),
    onExportCsv: jest.fn(),
    onExportJson: jest.fn(),
    onExportRegionsCsv: jest.fn(),
    onExportPng: jest.fn(),
    onOpenReport: jest.fn(),
    onShareExport: jest.fn(),
    onShareReport: jest.fn(),
    reportOpen: false,
    reportTitle: '',
    reportHtml: '',
    onCloseReport: jest.fn(),
    stackSliceCount: 0,
    stackIndex: 0,
    onStackIndexChange: jest.fn(),
    onAnalyzeStack: jest.fn(),
  };

  it('shows the image name and channel controls', () => {
    render(<ViewerTemplate {...props} />);
    expect(screen.getByText('scan.png')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Red channel' })
    ).toBeInTheDocument();
    expect(screen.getByText('Channels')).toBeInTheDocument();
  });

  it('shows an empty state when no raster is loaded', () => {
    render(<ViewerTemplate {...props} raster={null} name={null} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'No image loaded' })
    ).toBeInTheDocument();
  });

  it('renders channel histograms when analyses are provided', () => {
    render(
      <ViewerTemplate
        {...props}
        analyses={[
          {
            id: 'r',
            color: '#ff0030',
            histogram: [0, 1],
            stats: { min: 1, max: 1, mean: 1, count: 1 },
          },
        ]}
      />
    );
    expect(
      screen.getByRole('img', { name: 'Channel intensity histogram' })
    ).toBeInTheDocument();
    expect(screen.getByText('Mean')).toBeInTheDocument();
  });

  it('shows the slice navigator when a stack is loaded', () => {
    const onStackIndexChange = jest.fn();
    render(
      <ViewerTemplate
        {...props}
        stackSliceCount={4}
        stackIndex={1}
        onStackIndexChange={onStackIndexChange}
      />
    );
    expect(screen.getByText('Slice 2 / 4')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Slice index'), {
      target: { value: '3' },
    });
    expect(onStackIndexChange).toHaveBeenCalledWith(3);
  });

  it('hides the slice navigator without a stack', () => {
    render(<ViewerTemplate {...props} />);
    expect(screen.queryByLabelText('Slice index')).not.toBeInTheDocument();
  });

  it('shows the zoom minimap while an image is loaded', () => {
    render(<ViewerTemplate {...props} />);
    expect(screen.getByTestId('minimap')).toBeInTheDocument();
  });

  it('shows a side-by-side compare pane in side mode', () => {
    render(
      <ViewerTemplate
        {...props}
        compareRaster={{
          width: 2,
          height: 2,
          data: new Uint8ClampedArray(16),
        }}
        compareMode="side"
      />
    );
    expect(screen.getByTestId('compare-pane')).toBeInTheDocument();
  });

  it('hides the minimap in side-by-side compare mode', () => {
    render(
      <ViewerTemplate
        {...props}
        compareRaster={{
          width: 2,
          height: 2,
          data: new Uint8ClampedArray(16),
        }}
        compareMode="side"
      />
    );
    expect(screen.queryByTestId('minimap')).not.toBeInTheDocument();
  });

  it('shows compare controls', () => {
    render(<ViewerTemplate {...props} />);
    expect(
      screen.getByRole('button', { name: 'Load compare image' })
    ).toBeInTheDocument();
  });
});
