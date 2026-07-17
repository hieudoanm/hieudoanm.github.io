import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface PaletteColor {
  name: string;
  hex: string;
}

export const ColorPalette: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Brand Palette';
  const colors = (data.colors as PaletteColor[]) ?? [
    { name: 'Primary', hex: '#6366f1' },
    { name: 'Secondary', hex: '#8b5cf6' },
    { name: 'Accent', hex: '#f59e0b' },
    { name: 'Neutral', hex: '#64748b' },
    { name: 'Background', hex: '#f8fafc' },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-3 text-4xl font-black">{headline}</h1>
      <ul className="flex flex-1 flex-col gap-2">
        {colors.map((color) => (
          <li key={color.name} className="flex items-center gap-2">
            <div
              className="h-8 w-8 shrink-0 rounded-lg shadow-sm ring-1 ring-black/5"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex flex-col">
              <span className="text-base-content text-xs font-bold">
                {color.name}
              </span>
              <span className="text-neutral text-xs tracking-wide uppercase">
                {color.hex}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ColorPalette.displayName = 'ColorPalette';
