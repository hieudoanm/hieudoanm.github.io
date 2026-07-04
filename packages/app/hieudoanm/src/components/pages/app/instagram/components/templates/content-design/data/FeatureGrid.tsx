import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface FeatureDef {
  label: string;
  desc: string;
}

export const FeatureGrid: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const features = (data.features as FeatureDef[]) ?? [];
  const items =
    features.length > 0
      ? features
      : [
          { label: 'Fast', desc: 'Optimized for speed' },
          { label: 'Secure', desc: 'End-to-end encryption' },
          { label: 'Simple', desc: 'Minimal learning curve' },
          { label: 'Scalable', desc: 'Grows with your needs' },
        ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-8 text-center text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <div className="grid flex-1 grid-cols-2 gap-4">
        {items.slice(0, 4).map((f, i) => (
          <div
            key={i}
            className="rounded-box bg-accent/5 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary text-sm font-bold">0{i + 1}</span>
            </div>
            <span className="text-base-content text-sm font-bold tracking-tight">
              {f.label}
            </span>
            <span className="text-neutral text-xs leading-relaxed">
              {f.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

FeatureGrid.displayName = 'FeatureGrid';
