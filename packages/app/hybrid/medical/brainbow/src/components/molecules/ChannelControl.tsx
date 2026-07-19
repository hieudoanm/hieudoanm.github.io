import type { ChangeEvent, FC } from 'react';
import { Toggle } from '@/components/atoms/Toggle';
import { Slider } from '@/components/atoms/Slider';
import type { ChannelPlane } from '@/types/image';

export interface ChannelControlProps {
  name: string;
  color: string;
  sourcePlane: string;
  planes: ChannelPlane[];
  visible: boolean;
  opacity: number;
  onToggle: (visible: boolean) => void;
  onSourcePlaneChange: (sourcePlane: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const ChannelControl: FC<ChannelControlProps> = ({
  name,
  color,
  sourcePlane,
  planes,
  visible,
  opacity,
  onToggle,
  onSourcePlaneChange,
  onOpacityChange,
}) => {
  const handlePlaneChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onSourcePlaneChange(event.target.value);
  };

  return (
    <div className="border-base-300 bg-base-200 rounded-xl border p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium">{name}</span>
        </span>
        <Toggle
          checked={visible}
          label={`${name} channel`}
          showLabel={false}
          onChange={onToggle}
        />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-base-content/60 text-xs">Plane</span>
        <select
          className="select-bordered select select-xs flex-1"
          value={sourcePlane}
          aria-label={`${name} plane`}
          onChange={handlePlaneChange}>
          {planes.map((plane) => (
            <option key={plane.id} value={plane.id}>
              {plane.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-base-content/60 text-xs">Opacity</span>
        <div className="flex-1">
          <Slider
            value={opacity * 100}
            min={0}
            max={100}
            disabled={!visible}
            ariaLabel={`${name} opacity`}
            onChange={(value) => onOpacityChange(value / 100)}
          />
        </div>
        <span className="w-10 text-right font-mono text-xs">
          {Math.round(opacity * 100)}%
        </span>
      </div>
    </div>
  );
};
