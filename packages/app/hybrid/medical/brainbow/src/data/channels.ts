import type { ChannelConfig, ChannelState } from '@/types/image';

export const DEFAULT_CHANNELS: ChannelConfig[] = [
  { id: 'r', name: 'Red', sourcePlane: 'r', displayColor: '#ff0030' },
  { id: 'g', name: 'Green', sourcePlane: 'g', displayColor: '#00c853' },
  { id: 'b', name: 'Blue', sourcePlane: 'b', displayColor: '#4da3ff' },
];

export const toChannelStates = (channels: ChannelConfig[]): ChannelState[] =>
  channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    sourcePlane: channel.sourcePlane,
    color: channel.displayColor,
    visible: true,
    opacity: 1,
  }));

export const DEFAULT_CHANNEL_STATES: ChannelState[] =
  toChannelStates(DEFAULT_CHANNELS);
