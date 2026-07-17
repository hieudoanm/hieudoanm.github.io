import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Ring {
  label: string;
  items: string[];
}

export const OnionDiagram: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Onion Diagram';
  const text = (data.text as string) ?? '';
  const rings = (data.rings as Ring[]) ?? [
    { label: 'Core', items: ['Essential', 'Critical'] },
    { label: 'Inner', items: ['Important', 'Key'] },
    { label: 'Middle', items: ['Supporting', 'Helpful'] },
    { label: 'Outer', items: ['Optional', 'Nice to have'] },
  ];

  const colors = ['#ff0030', '#d90029', '#b30022', '#8c001b'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-3 text-center">
        <div className="text-base-content text-sm font-bold">{title}</div>
        {text && <div className="text-neutral mt-2 text-sm">{text}</div>}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex items-center justify-center">
          {[...rings].reverse().map((ring, i) => {
            const idx = rings.length - 1 - i;
            const size = 40 + idx * 30;
            return (
              <div
                key={i}
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  backgroundColor: colors[idx % colors.length],
                  opacity: 0.85,
                }}
              />
            );
          })}
          <div className="relative z-10 flex flex-col items-center gap-0.5 px-8 py-6">
            {rings.map((ring, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-sm font-bold text-white/80">
                  {ring.label}
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {ring.items.map((item, j) => (
                    <span key={j} className="text-sm font-medium text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

OnionDiagram.displayName = 'OnionDiagram';
