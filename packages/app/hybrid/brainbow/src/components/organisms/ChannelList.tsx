import type { FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ChannelControl } from '@/components/molecules/ChannelControl';
import { ChannelHistogram } from '@/components/molecules/ChannelHistogram';
import { Button } from '@/components/atoms/Button';
import type { ChannelAnalysis } from '@/lib/image/histogram';
import type { ChannelPlane, ChannelState } from '@/types/image';

export interface ChannelListProps {
  channels: ChannelState[];
  planes: ChannelPlane[];
  analyses?: ChannelAnalysis[] | null;
  onToggle: (id: string, visible: boolean) => void;
  onOpacityChange: (id: string, opacity: number) => void;
  onSourcePlaneChange: (id: string, sourcePlane: string) => void;
  onAddChannel: () => void;
}

export const ChannelList: FC<ChannelListProps> = ({
  channels,
  planes,
  analyses,
  onToggle,
  onOpacityChange,
  onSourcePlaneChange,
  onAddChannel,
}) => (
  <div className="flex flex-col gap-3">
    {channels.map((channel) => {
      const analysis = analyses?.find((a) => a.id === channel.id);
      return (
        <div key={channel.id}>
          <ChannelControl
            name={channel.name}
            color={channel.color}
            sourcePlane={channel.sourcePlane}
            planes={planes}
            visible={channel.visible}
            opacity={channel.opacity}
            onToggle={(visible) => onToggle(channel.id, visible)}
            onSourcePlaneChange={(sourcePlane) =>
              onSourcePlaneChange(channel.id, sourcePlane)
            }
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
    <Button
      variant="outline"
      size="sm"
      aria-label="Add channel"
      className="w-full"
      onClick={onAddChannel}>
      <FiPlus /> Add channel
    </Button>
  </div>
);
