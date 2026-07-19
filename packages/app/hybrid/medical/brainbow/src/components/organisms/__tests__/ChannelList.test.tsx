import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChannelList } from '@/components/organisms/ChannelList';
import { DEFAULT_CHANNEL_STATES } from '@/data/channels';
import type { ChannelPlane } from '@/types/image';

const planes: ChannelPlane[] = [
  { id: 'r', name: 'Red', data: new Uint8ClampedArray(0) },
  { id: 'g', name: 'Green', data: new Uint8ClampedArray(0) },
  { id: 'b', name: 'Blue', data: new Uint8ClampedArray(0) },
];

describe('ChannelList', () => {
  it('renders one control per channel', () => {
    render(
      <ChannelList
        channels={DEFAULT_CHANNEL_STATES}
        planes={planes}
        onToggle={jest.fn()}
        onOpacityChange={jest.fn()}
        onSourcePlaneChange={jest.fn()}
        onAddChannel={jest.fn()}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: 'Red channel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Green channel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Blue channel' })
    ).toBeInTheDocument();
  });

  it('reports channel toggles by id', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <ChannelList
        channels={DEFAULT_CHANNEL_STATES}
        planes={planes}
        onToggle={onToggle}
        onOpacityChange={jest.fn()}
        onSourcePlaneChange={jest.fn()}
        onAddChannel={jest.fn()}
      />
    );
    await user.click(screen.getByRole('checkbox', { name: 'Blue channel' }));
    expect(onToggle).toHaveBeenCalledWith('b', false);
  });

  it('renders a histogram for channels with analyses', () => {
    render(
      <ChannelList
        channels={DEFAULT_CHANNEL_STATES}
        planes={planes}
        analyses={[
          {
            id: 'r',
            color: '#ff0030',
            histogram: [0, 1],
            stats: { min: 1, max: 1, mean: 1, count: 1 },
          },
        ]}
        onToggle={jest.fn()}
        onOpacityChange={jest.fn()}
        onSourcePlaneChange={jest.fn()}
        onAddChannel={jest.fn()}
      />
    );
    expect(
      screen.getByRole('img', { name: 'Channel intensity histogram' })
    ).toBeInTheDocument();
  });
});
