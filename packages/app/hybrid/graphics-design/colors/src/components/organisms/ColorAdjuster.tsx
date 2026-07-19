'use client';

import { FC, useState } from 'react';
import { hexToHsl, hslToHex, Hsl } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { CopyRow } from '@/components/atoms/CopyRow';
import { TheoryNote } from '@/components/atoms/TheoryNote';

interface Row {
  label: string;
  value: string;
}

const Slider: FC<{
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, value, max, onChange }) => (
  <label className="flex items-center gap-3 text-sm">
    <span className="text-base-content/50 w-16">{label}</span>
    <input
      type="range"
      min={0}
      max={max}
      value={value}
      aria-label={label}
      onChange={(event) => onChange(Number(event.target.value))}
      className="range range-primary range-xs flex-1"
    />
    <span className="text-base-content font-mono text-xs">
      {label === 'Hue' ? `${value}°` : `${value}%`}
    </span>
  </label>
);

export const ColorAdjuster: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [hsl, setHsl] = useState<Hsl | null>(() => hexToHsl(baseColor));
  const [touched, setTouched] = useState(false);
  const { copied, copy } = useClipboard();

  if (!hsl) {
    return null;
  }

  const update = (patch: Partial<Hsl>) => {
    setHsl({ ...hsl, ...patch });
    setTouched(true);
  };

  const hex = touched ? hslToHex(hsl) : baseColor;

  const rows: Row[] = [
    { label: 'HEX', value: hex },
    {
      label: 'HSL',
      value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    },
  ];

  return (
    <div data-testid="color-adjuster" className="flex flex-col gap-5">
      <div
        className="border-base-300 h-24 w-full rounded-xl border"
        style={{ backgroundColor: hex }}
        aria-label="Adjusted color preview"
      />
      <div className="flex flex-col gap-3">
        <Slider
          label="Hue"
          value={hsl.h}
          max={360}
          onChange={(value) => update({ h: value })}
        />
        <Slider
          label="Saturation"
          value={hsl.s}
          max={100}
          onChange={(value) => update({ s: value })}
        />
        <Slider
          label="Lightness"
          value={hsl.l}
          max={100}
          onChange={(value) => update({ l: value })}
        />
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <CopyRow
            key={row.label}
            label={row.label}
            value={row.value}
            swatch={hex}
            copied={copied}
            onCopy={(text) => copy(text, text)}
          />
        ))}
      </div>
      <TheoryNote title="The HSL Model">
        HSL describes color perceptually. Hue is the angle on the color wheel
        (0° red, 120° green, 240° blue), saturation is how far the color sits
        from neutral gray (0% to 100%), and lightness is how much light it
        reflects (0% black to 100% white). Moving one slider while holding the
        others steady keeps the color family intact.
      </TheoryNote>
    </div>
  );
};
ColorAdjuster.displayName = 'ColorAdjuster';
