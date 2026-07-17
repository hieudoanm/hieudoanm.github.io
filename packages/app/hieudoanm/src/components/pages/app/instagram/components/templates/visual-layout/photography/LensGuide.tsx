import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Lens {
  name: string;
  focalLength: string;
  aperture: string;
  use: string;
}

export const LensGuide: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Lens Guide';
  const lenses = (data.lenses as Lens[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Lens Guide
      </div>
      <h1 className="text-base-content mb-2 text-4xl font-bold">{title}</h1>
      {lenses.length > 0 && (
        <div className="flex w-full max-w-md flex-col gap-1">
          {lenses.map((lens, i) => (
            <div
              key={i}
              className="border-base-300 flex items-center gap-1 rounded border p-1 text-left">
              <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                <span className="text-primary text-xs font-bold">
                  {lens.focalLength}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-base-content text-xs font-bold">
                  {lens.name}
                </div>
                <div className="text-neutral text-xs">
                  {lens.aperture} · {lens.use}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

LensGuide.displayName = 'LensGuide';
