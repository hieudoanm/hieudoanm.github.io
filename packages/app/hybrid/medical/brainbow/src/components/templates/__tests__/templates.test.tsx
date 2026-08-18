import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { VersionTemplate } from '@/components/templates/VersionTemplate';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';

jest.mock('@/lib/native', () => ({
  isTauri: jest.fn(() => false),
}));

import { isTauri } from '@/lib/native';

describe('HomeTemplate', () => {
  it('opens the demo dataset', async () => {
    const user = userEvent.setup();
    const onOpenDemo = jest.fn();
    render(<HomeTemplate onOpenDemo={onOpenDemo} onImportFiles={jest.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Open demo dataset' }));
    expect(onOpenDemo).toHaveBeenCalledTimes(1);
  });

  it('imports selected files', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('file-input');
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    await user.upload(input, file);
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('imports dropped files', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const zone = screen.getByTestId('drop-zone');
    const file = new File(['x'], 'scan.png', { type: 'image/png' });
    await user.hover(zone);
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('uses the native picker when provided', async () => {
    const user = userEvent.setup();
    const onNativeImport = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onNativeImport={onNativeImport}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(onNativeImport).toHaveBeenCalledTimes(1);
  });

  it('captures an image from the camera input', async () => {
    const user = userEvent.setup();
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('camera-input');
    const file = new File(['x'], 'capture.jpg', { type: 'image/jpeg' });
    await user.upload(input, file);
    expect(onImportFiles).toHaveBeenCalledWith([file]);
  });

  it('opens a brainbow project file', async () => {
    const user = userEvent.setup();
    const onOpenProjectFiles = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProjectFiles={onOpenProjectFiles}
      />
    );
    const input = screen.getByTestId('project-input');
    const file = new File(['{}'], 'scan.brainbow', {
      type: 'application/json',
    });
    await user.upload(input, file);
    expect(onOpenProjectFiles).toHaveBeenCalledWith([file]);
  });
});

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="404" description="Missing page" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Missing page')).toBeInTheDocument();
  });
});

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

describe('HomeTemplate – branch coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isTauri as jest.Mock).mockReturnValue(false);
  });

  it('does not call onImportFiles when file input is cleared with no selection', async () => {
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    const input = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { files: [] } });
    expect(onImportFiles).not.toHaveBeenCalled();
  });

  it('opens native picker when onNativeImport is provided', async () => {
    const onNativeImport = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onNativeImport={onNativeImport}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(onNativeImport).toHaveBeenCalled();
  });

  it('falls back to file input when onNativeImport is not provided', async () => {
    const user = userEvent.setup();
    render(<HomeTemplate onOpenDemo={jest.fn()} onImportFiles={jest.fn()} />);
    const fileInput = screen.getByTestId('file-input');
    const clickSpy = jest.spyOn(fileInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Import image' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('uses onOpenProject in Tauri environment', async () => {
    (isTauri as jest.Mock).mockReturnValue(true);
    const onOpenProject = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProject={onOpenProject}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(onOpenProject).toHaveBeenCalled();
  });

  it('falls back to project file input when isTauri is false', async () => {
    const onOpenProject = jest.fn();
    const user = userEvent.setup();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProject={onOpenProject}
      />
    );
    const projectInput = screen.getByTestId('project-input');
    const clickSpy = jest.spyOn(projectInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(onOpenProject).not.toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('falls back to project file input when onOpenProject is undefined', async () => {
    const user = userEvent.setup();
    render(<HomeTemplate onOpenDemo={jest.fn()} onImportFiles={jest.fn()} />);
    const projectInput = screen.getByTestId('project-input');
    const clickSpy = jest.spyOn(projectInput, 'click');
    await user.click(screen.getByRole('button', { name: 'Open project' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not call onOpenProjectFiles when project input has no files', () => {
    const onOpenProjectFiles = jest.fn();
    render(
      <HomeTemplate
        onOpenDemo={jest.fn()}
        onImportFiles={jest.fn()}
        onOpenProjectFiles={onOpenProjectFiles}
      />
    );
    fireEvent.change(screen.getByTestId('project-input'), {
      target: { files: [] },
    });
    expect(onOpenProjectFiles).not.toHaveBeenCalled();
  });

  it('does not call onImportFiles when drop has no files', () => {
    const onImportFiles = jest.fn();
    render(
      <HomeTemplate onOpenDemo={jest.fn()} onImportFiles={onImportFiles} />
    );
    fireEvent.drop(screen.getByTestId('drop-zone'), {
      dataTransfer: { files: [] },
    });
    expect(onImportFiles).not.toHaveBeenCalled();
  });
});

describe('VersionTemplate', () => {
  let writeTextSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    writeTextSpy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
    writeTextSpy.mockRestore();
  });

  it('renders all six segments for a full version string', () => {
    render(<VersionTemplate version="2024.06.15.08.30.45" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders only year, month, day segments when hh/mm/ss are absent', () => {
    render(<VersionTemplate version="2024.06.15" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders hour segment when only hh is provided', () => {
    render(<VersionTemplate version="2024.06.15.08" />);
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders hour and min segments when ss is absent', () => {
    render(<VersionTemplate version="2024.06.15.08.30" />);
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.queryByText('Sec')).not.toBeInTheDocument();
  });

  it('renders raw version text when hasSegments is false', () => {
    render(<VersionTemplate version="unknown" />);
    expect(
      screen.getByText('unknown', {
        selector: '.text-error',
      })
    ).toBeInTheDocument();
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('copies the version to the clipboard and shows copied state', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<VersionTemplate version="2024.01.01" />);
    await user.click(screen.getByRole('button', { name: /Copy version/i }));
    expect(writeTextSpy).toHaveBeenCalledWith('2024.01.01');
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
    expect(screen.getByText('Copied').closest('button')).toHaveClass(
      'btn-success'
    );
  });

  it('reverts to copy state after timeout', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<VersionTemplate version="2024.01.01" />);
    await user.click(screen.getByRole('button', { name: /Copy version/i }));
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await waitFor(() => {
      expect(screen.getByText('Copy version')).toBeInTheDocument();
    });
  });

  it('applies primary class to the year segment', () => {
    render(<VersionTemplate version="2024.06.15" />);
    const yearEl = screen.getByText('2024');
    expect(yearEl.className).toContain('text-primary');
  });

  it('does not apply primary class to non-year segments', () => {
    render(<VersionTemplate version="2024.06.15" />);
    const monthEl = screen.getByText('06');
    expect(monthEl.className).not.toContain('text-primary');
  });

  it('has a back link to the home page', () => {
    render(<VersionTemplate version="2024.01.01" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
