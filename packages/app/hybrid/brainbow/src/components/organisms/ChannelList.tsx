import type { FC } from 'react';
import { ChannelControl } from '@/components/molecules/ChannelControl';
import { ChannelHistogram } from '@/components/molecules/ChannelHistogram';
import type { ChannelAnalysis } from '@/lib/image/histogram';
import type { ChannelState } from '@/types/image';

export interface ChannelListProps {
  channels: ChannelState[];
  analyses?: ChannelAnalysis[] | null;
  onToggle: (id: string, visible: boolean) => void;
  onOpacityChange: (id: string, opacity: number) => void;
}

export const ChannelList: FC<ChannelListProps> = ({
  channels,
  analyses,
  onToggle,
  onOpacityChange,
}) => (
  <div className="flex flex-col gap-3">
    {channels.map((channel) => {
      const analysis = analyses?.find((a) => a.id === channel.id);
      return (
        <div key={channel.id}>
          <ChannelControl
            name={channel.name}
            color={channel.color}
            visible={channel.visible}
            opacity={channel.opacity}
            onToggle={(visible) => onToggle(channel.id, visible)}
            onOpacityChange={(opacity) => onOpacityChange(channel.id, opacity)}
          />
          {analysis && (
            <ChannelHistogram
              color={channel.color}
              histogram={analysis.histogram}
              stats={analysis.stats}
            />
          )}
        </div>
      );
    })}
  </div>
);
