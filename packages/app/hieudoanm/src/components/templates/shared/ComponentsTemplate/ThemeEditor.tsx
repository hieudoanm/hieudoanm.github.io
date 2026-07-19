import { FC, useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { ThemePresets, ThemeConfig } from './ThemePresets';

const RADIUS_OPTIONS = ['0rem', '0.25rem', '0.5rem', '1rem', '2rem'];
const SIZE_OPTIONS = ['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem'];
const BORDER_OPTIONS = ['0px', '1px', '2px', '3px'];

const COLOR_GROUPS = [
  {
    label: 'Primary',
    items: [
      { key: 'primary', label: 'Primary' },
      { key: 'primaryContent', label: 'Content' },
    ],
  },
  {
    label: 'Secondary',
    items: [
      { key: 'secondary', label: 'Secondary' },
      { key: 'secondaryContent', label: 'Content' },
    ],
  },
  {
    label: 'Accent',
    items: [
      { key: 'accent', label: 'Accent' },
      { key: 'accentContent', label: 'Content' },
    ],
  },
  {
    label: 'Neutral',
    items: [
      { key: 'neutral', label: 'Neutral' },
      { key: 'neutralContent', label: 'Content' },
    ],
  },
  {
    label: 'Base',
    items: [
      { key: 'base100', label: 'Base 100' },
      { key: 'base200', label: 'Base 200' },
      { key: 'base300', label: 'Base 300' },
      { key: 'baseContent', label: 'Content' },
    ],
  },
  {
    label: 'Info',
    items: [
      { key: 'info', label: 'Info' },
      { key: 'infoContent', label: 'Content' },
    ],
  },
  {
    label: 'Success',
    items: [
      { key: 'success', label: 'Success' },
      { key: 'successContent', label: 'Content' },
    ],
  },
  {
    label: 'Warning',
    items: [
      { key: 'warning', label: 'Warning' },
      { key: 'warningContent', label: 'Content' },
    ],
  },
  {
    label: 'Error',
    items: [
      { key: 'error', label: 'Error' },
      { key: 'errorContent', label: 'Content' },
    ],
  },
];

const CSS_VAR_MAP: Record<string, string> = {
  primary: '--color-primary',
  primaryContent: '--color-primary-content',
  secondary: '--color-secondary',
  secondaryContent: '--color-secondary-content',
  accent: '--color-accent',
  accentContent: '--color-accent-content',
  neutral: '--color-neutral',
  neutralContent: '--color-neutral-content',
  base100: '--color-base-100',
  base200: '--color-base-200',
  base300: '--color-base-300',
  baseContent: '--color-base-content',
  info: '--color-info',
  infoContent: '--color-info-content',
  success: '--color-success',
  successContent: '--color-success-content',
  warning: '--color-warning',
  warningContent: '--color-warning-content',
  error: '--color-error',
  errorContent: '--color-error-content',
};

export const generateCSS = (config: ThemeConfig): string => {
  const lines = [`@plugin 'daisyui/theme' {`, `  name: '${config.name}';`];
  lines.push(`  color-scheme: '${config.darkMode ? 'dark' : 'light'}';`);
  for (const [key, value] of Object.entries(config.colors)) {
    lines.push(`  ${CSS_VAR_MAP[key] || `--color-${key}`}: ${value};`);
  }
  lines.push(`  --radius-box: ${config.shape.radiusBox};`);
  lines.push(`  --radius-field: ${config.shape.radiusField};`);
  lines.push(`  --radius-selector: ${config.shape.radiusSelector};`);
  lines.push(`  --size-field: ${config.size.field};`);
  lines.push(`  --size-selector: ${config.size.selector};`);
  lines.push(`  --border: ${config.border};`);
  lines.push(`  --noise: ${config.noise ? '1' : '0'};`);
  lines.push('}');
  return lines.join('\n');
};

export const buildThemeStyles = (
  config: ThemeConfig
): Record<string, string> => {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(config.colors)) {
    styles[CSS_VAR_MAP[key] || `--color-${key}`] = value;
  }
  styles['--radius-box'] = config.shape.radiusBox;
  styles['--radius-field'] = config.shape.radiusField;
  styles['--radius-selector'] = config.shape.radiusSelector;
  styles['--size-field'] = config.size.field;
  styles['--size-selector'] = config.size.selector;
  styles['--border'] = config.border;
  styles['--noise'] = config.noise ? '1' : '0';
  return styles;
};

const RadiusSelector: FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="mb-3 last:mb-0">
    <div className="text-base-content/50 mb-2 text-[10px]">{label}</div>
    <div className="flex gap-1">
      {RADIUS_OPTIONS.map((r) => (
        <button
          key={r}
          className={`bg-base-100 h-8 flex-1 border-2 transition-colors ${
            value === r
              ? 'border-primary'
              : 'border-base-300 hover:border-base-content/20'
          }`}
          style={{ borderRadius: r }}
          onClick={() => onChange(r)}
        />
      ))}
    </div>
  </div>
);

const SizeSlider: FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ label, value, options, onChange }) => {
  const idx = options.indexOf(value);
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-base-content/50 mb-2 flex justify-between text-[10px]">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        value={idx >= 0 ? idx : 1}
        onChange={(e) => onChange(options[Number(e.target.value)])}
        className="range range-xs w-full"
      />
    </div>
  );
};

export const ThemeEditor: FC<{
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
}> = ({ config, onChange }) => {
  const [cssCopied, setCssCopied] = useState(false);

  const update = (partial: Partial<ThemeConfig>) =>
    onChange({ ...config, ...partial });
  const updateColor = (key: string, value: string) =>
    update({ colors: { ...config.colors, [key]: value } });
  const updateShape = (key: string, value: string) =>
    update({ shape: { ...config.shape, [key]: value } });

  const copyCSS = async () => {
    await navigator.clipboard.writeText(generateCSS(config));
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  return (
    <div className="bg-base-200 border-base-300 flex h-full w-80 shrink-0 flex-col overflow-y-auto border-r">
      <div className="border-base-300 border-b p-5">
        <h3 className="text-base-content mb-3 text-xs font-medium tracking-wider uppercase">
          Presets
        </h3>
        <ThemePresets onSelect={onChange} />
      </div>

      <div className="border-base-300 border-b p-5">
        <label className="text-base-content mb-2 block text-xs font-medium">
          Theme name
        </label>
        <input
          type="text"
          value={config.name}
          onChange={(e) => update({ name: e.target.value })}
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
                onChange={(v) => updateColor(key, v)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="border-base-300 border-b p-5">
        <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
          Shape
        </h3>
        <RadiusSelector
          label="Box border radius"
          value={config.shape.radiusBox}
          onChange={(v) => updateShape('radiusBox', v)}
        />
        <RadiusSelector
          label="Field border radius"
          value={config.shape.radiusField}
          onChange={(v) => updateShape('radiusField', v)}
        />
        <RadiusSelector
          label="Selector border radius"
          value={config.shape.radiusSelector}
          onChange={(v) => updateShape('radiusSelector', v)}
        />
      </div>

      <div className="border-base-300 border-b p-5">
        <h3 className="text-base-content mb-4 text-xs font-medium tracking-wider uppercase">
          Size &amp; Border
        </h3>
        <SizeSlider
          label="Fields base size"
          value={config.size.field}
          options={SIZE_OPTIONS}
          onChange={(v) => update({ size: { ...config.size, field: v } })}
        />
        <SizeSlider
          label="Selectors base size"
          value={config.size.selector}
          options={SIZE_OPTIONS}
          onChange={(v) => update({ size: { ...config.size, selector: v } })}
        />
        <SizeSlider
          label="Border width"
          value={config.border}
          options={BORDER_OPTIONS}
          onChange={(v) => update({ border: v })}
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
            onChange={(e) => update({ darkMode: e.target.checked })}
            className="toggle toggle-primary toggle-sm"
          />
          Dark mode
        </label>
        <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={config.noise}
            onChange={(e) => update({ noise: e.target.checked })}
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
          onClick={copyCSS}
          className="btn btn-primary btn-sm mt-3 w-full">
          {cssCopied ? '✓ Copied!' : 'Copy CSS'}
        </button>
      </div>
    </div>
  );
};
ThemeEditor.displayName = 'ThemeEditor';
