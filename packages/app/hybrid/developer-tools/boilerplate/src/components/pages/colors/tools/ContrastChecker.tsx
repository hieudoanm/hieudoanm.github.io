'use client';

import { FC, useEffect, useState } from 'react';
import { contrastPasses, contrastRatio, parseColor } from '../utils/colors';
import { TheoryNote } from './TheoryNote';

const ColorField: FC<{
  label: string;
  value: string;
  onChange: (hex: string) => void;
}> = ({ label, value, onChange }) => (
  <label className="flex flex-col gap-1">
    <span className="text-base-content/50 text-xs">{label}</span>
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label={`${label} color picker`}
        className="h-9 w-12 cursor-pointer rounded border"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        key={value}
        type="text"
        aria-label={`${label} hex value`}
        defaultValue={value}
        className="input input-bordered input-sm font-mono"
        onBlur={(event) => {
          const parsed = parseColor(event.target.value);
          if (parsed) {
            onChange(parsed.hex);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }
        }}
      />
    </div>
  </label>
);

interface Criterion {
  level: 'AA' | 'AAA';
  large: boolean;
}

const CRITERIA: Criterion[] = [
  { level: 'AA', large: false },
  { level: 'AA', large: true },
  { level: 'AAA', large: false },
  { level: 'AAA', large: true },
];

export const ContrastChecker: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [foreground, setForeground] = useState(baseColor);
  const [background, setBackground] = useState('#000000');

  useEffect(() => {
    setForeground(baseColor);
  }, [baseColor]);

  const ratio = contrastRatio(foreground, background);

  return (
    <div data-testid="contrast-checker" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-6">
        <ColorField
          label="Foreground"
          value={foreground}
          onChange={setForeground}
        />
        <ColorField
          label="Background"
          value={background}
          onChange={setBackground}
        />
        <div
          className="flex h-20 w-32 items-center justify-center rounded-xl border text-2xl"
          style={{ color: foreground, backgroundColor: background }}
          aria-label="Contrast preview">
          Aa
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-base-content/50 text-xs">Contrast ratio</span>
          <span className="text-base-content font-mono text-3xl font-light">
            {ratio.toFixed(2)}:1
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {CRITERIA.map(({ level, large }) => {
            const passes = contrastPasses(ratio, level, large);
            const label = `${level} ${large ? 'Large' : 'Normal'} text`;
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="text-base-content/70 text-xs">{label}</span>
                <span
                  className={`badge badge-sm ${passes ? 'badge-success' : 'badge-error'}`}>
                  {passes ? 'Pass' : 'Fail'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <TheoryNote title="Contrast and WCAG">
        Contrast ratio compares relative luminance — how bright each color
        appears to the eye, weighting green most and blue least. WCAG asks for
        4.5:1 on normal text (AA), 3:1 on large text, 7:1 on AAA normal text and
        4.5:1 on AAA large text. High ratios also matter for icons and graphical
        elements, not only text.
      </TheoryNote>
    </div>
  );
};
ContrastChecker.displayName = 'ContrastChecker';
