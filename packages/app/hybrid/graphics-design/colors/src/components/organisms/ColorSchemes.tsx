'use client';

import { FC } from 'react';
import { colorSchemes } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { Swatch } from '@/components/atoms/Swatch';
import { TheoryNote } from '@/components/atoms/TheoryNote';

interface SchemeRow {
  label: string;
  colors: string[];
}

export const ColorSchemes: FC<{ baseColor: string }> = ({ baseColor }) => {
  const { copied, copy } = useClipboard();
  const schemes = colorSchemes(baseColor);

  if (!schemes) {
    return null;
  }

  const rows: SchemeRow[] = [
    { label: 'Complementary', colors: [baseColor, schemes.complement] },
    { label: 'Analogous', colors: [baseColor, ...schemes.analogous] },
    { label: 'Triadic', colors: schemes.triadic },
    { label: 'Monochromatic', colors: schemes.monochromatic },
  ];

  return (
    <div data-testid="color-schemes" className="grid grid-cols-1 gap-5">
      {rows.map(({ label, colors }) => (
        <div key={label}>
          <h3 className="text-base-content/50 mb-2 text-xs font-medium uppercase">
            {label}
          </h3>
          <div className="flex gap-3">
            {colors.map((hex) => (
              <Swatch
                key={hex}
                hex={hex}
                copied={copied === hex}
                onCopy={(value) => copy(value, value)}
              />
            ))}
          </div>
        </div>
      ))}
      <TheoryNote title="Color Harmony">
        Harmonies pick colors by their angle on the wheel. Complementary colors
        sit 180° apart and create maximum contrast. Analogous colors are
        neighbors within about 30° and feel calm. Triadic colors are spaced 120°
        apart, staying balanced yet vibrant. Monochromatic schemes keep one hue
        and vary lightness for a cohesive look.
      </TheoryNote>
    </div>
  );
};
ColorSchemes.displayName = 'ColorSchemes';
