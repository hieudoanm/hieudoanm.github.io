'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { useTheme } from '@/layout';
import { cssVarName } from '@/layout/editor';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

const SWATCHES: { key: string; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'primaryContent', label: 'Primary Content' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'secondaryContent', label: 'Secondary Content' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentContent', label: 'Accent Content' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'neutralContent', label: 'Neutral Content' },
  { key: 'base100', label: 'Base 100' },
  { key: 'base200', label: 'Base 200' },
  { key: 'base300', label: 'Base 300' },
  { key: 'baseContent', label: 'Base Content' },
  { key: 'info', label: 'Info' },
  { key: 'infoContent', label: 'Info Content' },
  { key: 'success', label: 'Success' },
  { key: 'successContent', label: 'Success Content' },
  { key: 'warning', label: 'Warning' },
  { key: 'warningContent', label: 'Warning Content' },
  { key: 'error', label: 'Error' },
  { key: 'errorContent', label: 'Error Content' },
];

export const ColorsTool: FC<{ onPick?: (hex: string) => void }> = ({
  onPick,
}) => {
  const { config } = useTheme();
  const { copied, copy } = useClipboard();

  const handleClick = (key: string, value: string) => {
    const variable = cssVarName(key);
    void copy(variable, `${variable}: ${value}`);
    onPick?.(value);
  };

  return (
    <div data-testid="colors-tool" className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {SWATCHES.map(({ key, label }) => {
          const value = config.colors[key];
          const variable = cssVarName(key);
          return (
            <button
              key={key}
              type="button"
              aria-label={`Copy ${label}`}
              className="border-base-300 overflow-hidden rounded-xl border text-left"
              title={`Copy ${variable}`}
              onClick={() => handleClick(key, value)}>
              <div className="h-16 w-full" style={{ backgroundColor: value }} />
              <div className="bg-base-100 flex items-center justify-between p-3">
                <div>
                  <div className="text-base-content text-xs font-medium">
                    {label}
                  </div>
                  <div className="text-base-content/40 font-mono text-[10px] uppercase">
                    {value}
                  </div>
                </div>
                {copied === variable ? (
                  <FiCheck className="text-success shrink-0" />
                ) : (
                  <FiCopy className="text-base-content/40 shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      <TheoryNote title="Color Roles">
        Theme colors map a palette onto roles. In DaisyUI each role such as
        primary, secondary, accent or base-100 is a CSS variable, and the
        “content” roles hold the readable text color for their paired
        background. The primary color is the brand color used for main actions.
      </TheoryNote>
    </div>
  );
};
ColorsTool.displayName = 'ColorsTool';
