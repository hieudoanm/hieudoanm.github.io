import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

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

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <h1 className="text-base-content mb-4 text-center text-4xl font-bold tracking-tight">
        {headline}
      </h1>
      <ul className="grid flex-1 grid-cols-2 gap-2">
        {items.slice(0, 4).map((f, i) => (
          <li
            key={i}
            className="rounded-box bg-accent/5 flex flex-col items-center justify-center gap-1 p-4 text-center">
            <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary text-sm font-bold">0{i + 1}</span>
            </div>
            <strong className="text-base-content text-sm font-bold tracking-tight">
              {f.label}
            </strong>
            <span className="text-neutral text-xs leading-relaxed">
              {f.desc}
            </span>
          </li>
        ))}
      </ul>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

FeatureGrid.displayName = 'FeatureGrid';
