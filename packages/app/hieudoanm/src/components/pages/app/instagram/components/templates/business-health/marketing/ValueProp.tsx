import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Feature {
  title: string;
  description: string;
}

export const ValueProp: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Why Choose Us';
  const features = (data.features as Feature[]) ?? [
    {
      title: 'Lightning Fast',
      description: 'Optimized for speed at every layer',
    },
    {
      title: 'Built to Scale',
      description: 'Grows with your business effortlessly',
    },
    {
      title: 'Secure by Default',
      description: 'Enterprise-grade security out of the box',
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-6">
      <div className="mb-3 text-center">
        <div className="text-base-content text-sm font-bold">{headline}</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {features.map((f, i) => (
          <div
            key={i}
            className="border-base-300 flex items-start gap-3 rounded border px-3 py-2">
            <div className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white">
              {i + 1}
            </div>
            <div>
              <div className="text-base-content text-xs font-bold">
                {f.title}
              </div>
              <div className="text-neutral mt-0.5 text-[10px]">
                {f.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ValueProp.displayName = 'ValueProp';
