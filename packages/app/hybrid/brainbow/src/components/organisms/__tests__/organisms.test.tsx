import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChannelList } from '@/components/organisms/ChannelList';
import { ViewerCanvas } from '@/components/organisms/ViewerCanvas';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';

describe('ChannelList', () => {
  it('renders one control per channel', () => {
    render(
      <ChannelList
        channels={DEFAULT_CHANNEL_STATES}
        onToggle={jest.fn()}
        onOpacityChange={jest.fn()}
      />
    );
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('reports channel toggles by id', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <ChannelList
        channels={DEFAULT_CHANNEL_STATES}
        onToggle={onToggle}
        onOpacityChange={jest.fn()}
      />
    );
    await user.click(screen.getByRole('checkbox', { name: 'Blue channel' }));
    expect(onToggle).toHaveBeenCalledWith('b', false);
  });
});

describe('ViewerCanvas', () => {
  const props = {
    raster: {
      width: 2,
      height: 1,
      data: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]),
    },
    transform: { scale: 1, offsetX: 0, offsetY: 0 },
    onTransformChange: jest.fn(),
    onSizeChange: jest.fn(),
  };

  it('renders a canvas element', () => {
    render(<ViewerCanvas {...props} />);
    expect(screen.getByTestId('viewer-canvas')).toBeInTheDocument();
  });
});
