import { FC } from 'react';
import { ThemeConfig } from '../ThemeConfig';
import { COLOR_GROUPS } from '../theme-data';
import { ColorPicker } from './ColorPicker';

export const ColorsPane: FC<{
  config: ThemeConfig;
  onUpdateColor: (key: string, value: string) => void;
  onUpdateName: (name: string) => void;
}> = ({ config, onUpdateColor, onUpdateName }) => (
  <div className="flex-1 overflow-y-auto">
    <div className="border-base-300 border-b p-5">
      <label className="text-base-content mb-2 block text-xs font-medium">
        Theme name
      </label>
      <input
        type="text"
        value={config.name}
        onChange={(e) => onUpdateName(e.target.value)}
        className="input input-bordered input-sm w-full"
      />
    </div>
    <div className="border-base-300 border-b p-5">
      <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
        Colors
      </h3>
      {COLOR_GROUPS.map((group) => (
        <div key={group.label} className="mb-4 last:mb-0">
          <div className="text-base-content/50 mb-1 text-[10px] font-medium tracking-wider uppercase">
            {group.label}
          </div>
          {group.items.map(({ key, label }) => (
            <ColorPicker
              key={key}
              label={label}
              value={config.colors[key]}
              onChange={(v) => onUpdateColor(key, v)}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);
ColorsPane.displayName = 'ColorsPane';
