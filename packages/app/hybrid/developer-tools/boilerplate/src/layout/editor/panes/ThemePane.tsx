import { FC } from 'react';
import { ThemeConfig } from '../ThemeConfig';
import { generateCSS } from '../css-utils';
import { COLOR_GROUPS } from '../theme-data';
import { ColorPicker } from './ColorPicker';
import { RadiusSelector, SizeSlider } from './editor-controls';

export const ThemePane: FC<{
  config: ThemeConfig;
  onUpdateColor: (key: string, value: string) => void;
  onUpdateName: (name: string) => void;
  onUpdate: (partial: Partial<ThemeConfig>) => void;
  onUpdateShape: (key: string, value: string) => void;
  cssCopied: boolean;
  onCopyCSS: () => void;
}> = ({
  config,
  onUpdateColor,
  onUpdateName,
  onUpdate,
  onUpdateShape,
  cssCopied,
  onCopyCSS,
}) => (
  <div className="flex-1 overflow-y-auto">
    <div className="border-base-300 border-b p-3">
      <label className="text-base-content mb-1 block text-[11px] font-medium">
        Theme name
      </label>
      <input
        type="text"
        value={config.name}
        onChange={(e) => onUpdateName(e.target.value)}
        className="input input-bordered input-sm w-full"
      />
    </div>
    <div className="border-base-300 border-b p-3">
      <h3 className="text-base-content mb-2 text-[11px] font-medium tracking-wider uppercase">
        Colors
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {COLOR_GROUPS.map((group) => (
          <div
            key={group.label}
            className={group.items.length > 2 ? 'col-span-4' : 'col-span-2'}>
            <div className="text-base-content/50 mb-0.5 text-[9px] font-medium tracking-wider uppercase">
              {group.label}
            </div>
            <div
              className={`grid gap-1.5 ${
                group.items.length > 2 ? 'grid-cols-4' : 'grid-cols-2'
              }`}>
              {group.items.map(({ key, label }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  value={config.colors[key]}
                  onChange={(v) => onUpdateColor(key, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="border-base-300 border-b p-3">
      <h3 className="text-base-content mb-2 text-[11px] font-medium tracking-wider uppercase">
        Shape
      </h3>
      <RadiusSelector
        label="Box border radius"
        value={config.shape.radiusBox}
        onChange={(v) => onUpdateShape('radiusBox', v)}
      />
      <RadiusSelector
        label="Field border radius"
        value={config.shape.radiusField}
        onChange={(v) => onUpdateShape('radiusField', v)}
      />
      <RadiusSelector
        label="Selector border radius"
        value={config.shape.radiusSelector}
        onChange={(v) => onUpdateShape('radiusSelector', v)}
      />
    </div>
    <div className="border-base-300 border-b p-3">
      <h3 className="text-base-content mb-2 text-[11px] font-medium tracking-wider uppercase">
        Size &amp; Border
      </h3>
      <SizeSlider
        label="Fields base size"
        value={config.size.field}
        options={['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem']}
        onChange={(v) => onUpdate({ size: { ...config.size, field: v } })}
      />
      <SizeSlider
        label="Selectors base size"
        value={config.size.selector}
        options={['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem']}
        onChange={(v) => onUpdate({ size: { ...config.size, selector: v } })}
      />
      <SizeSlider
        label="Border width"
        value={config.border}
        options={['0px', '1px', '2px', '3px']}
        onChange={(v) => onUpdate({ border: v })}
      />
    </div>
    <div className="border-base-300 border-b p-3">
      <h3 className="text-base-content mb-2 text-[11px] font-medium tracking-wider uppercase">
        Options
      </h3>
      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={config.darkMode}
          onChange={(e) => onUpdate({ darkMode: e.target.checked })}
          className="toggle toggle-primary toggle-sm"
        />
        Dark mode
      </label>
      <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={config.noise}
          onChange={(e) => onUpdate({ noise: e.target.checked })}
          className="toggle toggle-primary toggle-sm"
        />
        Noise texture
      </label>
    </div>
    <div className="p-3">
      <h3 className="text-base-content mb-3 text-[11px] font-medium tracking-wider uppercase">
        CSS Output
      </h3>
      <pre className="bg-base-300 text-base-content/70 max-h-48 overflow-auto rounded-lg p-3 text-[10px] leading-relaxed">
        {generateCSS(config)}
      </pre>
      <button
        onClick={onCopyCSS}
        className="btn btn-primary btn-sm mt-3 w-full">
        {cssCopied ? '✓ Copied!' : 'Copy CSS'}
      </button>
    </div>
  </div>
);
ThemePane.displayName = 'ThemePane';
