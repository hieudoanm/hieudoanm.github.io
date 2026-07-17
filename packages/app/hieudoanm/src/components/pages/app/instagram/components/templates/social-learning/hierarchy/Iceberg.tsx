import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Layer {
  label: string;
  items: string[];
}

export const Iceberg: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Iceberg';
  const text = (data.text as string) ?? '';
  const layers = (data.layers as Layer[]) ?? [
    { label: 'Surface', items: ['What everyone sees'] },
    { label: 'Below Water', items: ['What few know', 'Hidden effort'] },
    { label: 'Deep', items: ['Secrets', 'Years of practice'] },
    { label: 'Abyss', items: ['Unknown to most', 'Core truth'] },
  ];

  const colors = ['#ffccd5', '#ff99ab', '#ff6680', '#ff0030'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-3 text-center">
        <div className="text-base-content text-sm font-bold">{title}</div>
        {text && <div className="text-neutral mt-2 text-sm">{text}</div>}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        {layers.map((layer, i) => {
          const width = 100 - i * 18;
          return (
            <div
              key={i}
              className="flex w-full items-center justify-center"
              style={{ paddingLeft: `${i * 9}%`, paddingRight: `${i * 9}%` }}>
              <div
                className="flex flex-col items-center rounded-2xl px-4 py-2"
                style={{
                  width: `${width}%`,
                  backgroundColor: colors[i % colors.length],
                }}>
                <span className="text-sm font-bold text-white/80">
                  {layer.label}
                </span>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {layer.items.map((item, j) => (
                    <span key={j} className="text-sm font-medium text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Iceberg.displayName = 'Iceberg';
