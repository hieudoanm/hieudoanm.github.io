import { FC } from 'react';
import { ThemeConfig } from '../ThemeConfig';
import { generateCSS } from '../css-utils';
import { RadiusSelector, SizeSlider } from './editor-controls';

export const SettingsPane: FC<{
  config: ThemeConfig;
  onUpdate: (partial: Partial<ThemeConfig>) => void;
  onUpdateShape: (key: string, value: string) => void;
  cssCopied: boolean;
  onCopyCSS: () => void;
}> = ({ config, onUpdate, onUpdateShape, cssCopied, onCopyCSS }) => (
  <div className="flex-1 overflow-y-auto">
    <div className="border-base-300 border-b p-5">
      <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
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
    <div className="border-base-300 border-b p-5">
      <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
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
    <div className="border-base-300 border-b p-5">
      <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
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
    <div className="p-5">
      <h3 className="text-base-content mb-3 text-xs font-medium tracking-wider uppercase">
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
SettingsPane.displayName = 'SettingsPane';
