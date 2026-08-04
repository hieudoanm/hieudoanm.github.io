import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';

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
    analyses: null,
    transform: { scale: 1, offsetX: 0, offsetY: 0 },
    size: { width: 800, height: 600 },
    onOpenDemo: jest.fn(),
    onSetSize: jest.fn(),
    onFitView: jest.fn(),
    onZoomIn: jest.fn(),
    onZoomOut: jest.fn(),
    onTransformChange: jest.fn(),
    onToggleChannel: jest.fn(),
    onSetChannelOpacity: jest.fn(),
    onSaveProject: jest.fn(),
    layers: [],
    activeLayer: null,
    tool: 'pan' as const,
    canUndo: false,
    canRedo: false,
    onToolChange: jest.fn(),
    onAddLayer: jest.fn(),
    onRemoveLayer: jest.fn(),
    onToggleLayerVisibility: jest.fn(),
    onSetLayerColor: jest.fn(),
    onSetActiveLayer: jest.fn(),
    onAddAnnotation: jest.fn(),
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    analysisStatus: 'idle' as const,
    analysisProgress: 0,
    analysisError: null,
    k: 5,
    analysisResult: null,
    batchResult: null,
    onSetK: jest.fn(),
    onRunSingle: jest.fn(),
    onBatchFiles: jest.fn(),
    onExportCsv: jest.fn(),
    onExportJson: jest.fn(),
    onExportPng: jest.fn(),
    onOpenReport: jest.fn(),
    reportOpen: false,
    reportTitle: '',
    reportHtml: '',
    onCloseReport: jest.fn(),
  };

  it('shows the image name and channel controls', () => {
    render(<ViewerTemplate {...props} />);
    expect(screen.getByText('scan.png')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
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
});
