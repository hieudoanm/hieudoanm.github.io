import {
  DEFAULT_CHANNELS,
  DEFAULT_CHANNEL_STATES,
  toChannelStates,
} from '@/data/channels';

describe('toChannelStates', () => {
  it('maps channel configs to visible opaque channel states', () => {
    const states = toChannelStates([
      { id: 'r', name: 'Red', sourcePlane: 'r', displayColor: '#ff0030' },
    ]);
    expect(states).toEqual([
      {
        id: 'r',
        name: 'Red',
        sourcePlane: 'r',
        color: '#ff0030',
        visible: true,
        opacity: 1,
      },
    ]);
  });
});

describe('DEFAULT_CHANNELS', () => {
  it('defines the red, green, and blue planes', () => {
    expect(DEFAULT_CHANNELS.map((channel) => channel.id)).toEqual([
      'r',
      'g',
      'b',
    ]);
  });
});

describe('DEFAULT_CHANNEL_STATES', () => {
  it('mirrors the default channels', () => {
    expect(DEFAULT_CHANNEL_STATES).toHaveLength(3);
    expect(DEFAULT_CHANNEL_STATES[0].color).toBe('#ff0030');
    expect(DEFAULT_CHANNEL_STATES.every((channel) => channel.visible)).toBe(
      true
    );
  });
});
