import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const AspectRatio: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Common Ratios';
  const ratios = (data.ratios as { label: string; description: string }[]) ?? [
    { label: '1:1', description: 'Instagram Feed' },
    { label: '4:5', description: 'Instagram Portrait' },
    { label: '16:9', description: 'YouTube Thumbnail' },
  ];

  const getDimensions = (label: string) => {
    const [w, h] = label.split(':').map(Number);
    const scale = 80 / Math.max(w, h);
    return { width: w * scale, height: h * scale };
  };

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-6 text-4xl font-bold">{headline}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {ratios.map((r, i) => {
          const dim = getDimensions(r.label);
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="bg-accent/10 border-accent/30 flex items-center justify-center rounded border">
                <span className="text-accent text-xs font-bold">{r.label}</span>
              </div>
              <span className="text-neutral text-xs">{r.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

AspectRatio.displayName = 'AspectRatio';
