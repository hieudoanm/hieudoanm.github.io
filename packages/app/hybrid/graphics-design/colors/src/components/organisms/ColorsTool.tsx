'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { useClipboard } from '@/hooks/useClipboard';
import { ThemeSwatch, useThemeColors } from './themeColors';
import { TheoryNote } from '@/components/atoms/TheoryNote';

export const DEFAULT_BASE_COLOR = '#6366f1';

export const ColorsTool: FC<{ onPick?: (hex: string) => void }> = ({
  onPick,
}) => {
  const swatches = useThemeColors();
  const { copied, copy } = useClipboard();

  const handleClick = (key: string, value: string) => {
    const variable = `--color-${key}`;
    void copy(variable, `${variable}: ${value}`);
    onPick?.(value);
  };

  return (
    <div data-testid="colors-tool" className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {swatches.map(({ key, label, value }: ThemeSwatch) => {
          const variable = `--color-${key}`;
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
        content roles hold the readable text color for their paired background.
        The primary color is the brand color used for main actions.
      </TheoryNote>
    </div>
  );
};
ColorsTool.displayName = 'ColorsTool';
