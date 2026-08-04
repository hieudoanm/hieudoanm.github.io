import { render, screen } from '@testing-library/react';
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
});
