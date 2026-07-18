import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

interface PaletteColor {
  name: string;
  hex: string;
}

export const PaletteInspiration: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Palette Inspiration';
  const description = (data.description as string) ?? '';
  const palette = (data.palette as PaletteColor[]) ?? [
    { name: 'Sunset', hex: '#f97316' },
    { name: 'Coral', hex: '#fb7185' },
    { name: 'Lavender', hex: '#a78bfa' },
    { name: 'Sky', hex: '#38bdf8' },
    { name: 'Sage', hex: '#86efac' },
  ];
  const mood = (data.mood as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
      <h1 className="text-base-content mb-1 text-4xl font-black tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-neutral mb-3 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      <ul className="mb-3 flex w-full items-center justify-center gap-1">
        {palette.map((c) => (
          <li key={c.name} className="flex flex-col items-center gap-1">
            <div
              className="h-14 w-14 rounded-xl shadow-md ring-1 ring-black/10"
              style={{ backgroundColor: c.hex }}
            />
            <h3 className="text-base-content text-xs font-bold">{c.name}</h3>
            <span className="text-neutral text-xs tracking-wider uppercase">
              {c.hex}
            </span>
          </li>
        ))}
      </ul>
      {mood && (
        <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
          {mood}
        </span>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

PaletteInspiration.displayName = 'PaletteInspiration';
