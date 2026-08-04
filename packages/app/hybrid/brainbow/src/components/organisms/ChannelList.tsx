import type { FC } from 'react';
import { ChannelControl } from '@/components/molecules/ChannelControl';
import type { ChannelState } from '@/types/image';

export interface ChannelListProps {
  channels: ChannelState[];
  onToggle: (id: string, visible: boolean) => void;
  onOpacityChange: (id: string, opacity: number) => void;
}

export const ChannelList: FC<ChannelListProps> = ({
  channels,
  onToggle,
  onOpacityChange,
}) => (
  <div className="flex flex-col gap-3">
    {channels.map((channel) => (
      <ChannelControl
        key={channel.id}
        name={channel.name}
        color={channel.color}
        visible={channel.visible}
        opacity={channel.opacity}
        onToggle={(visible) => onToggle(channel.id, visible)}
        onOpacityChange={(opacity) => onOpacityChange(channel.id, opacity)}
      />
    ))}
  </div>
);
