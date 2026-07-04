import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface ArtStyle {
  name: string;
  era: string;
  description: string;
  characteristics: string;
}

export const StyleGuide: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Art Styles';
  const styles = (data.styles as ArtStyle[]) ?? [
    {
      name: 'Impressionism',
      era: '1860s',
      description: 'Light and movement',
      characteristics: 'Visible brushstrokes, open composition',
    },
    {
      name: 'Cubism',
      era: '1907',
      description: 'Geometric forms',
      characteristics: 'Fragmented objects, multiple viewpoints',
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-6 text-2xl font-black tracking-tight">
        {title}
      </h1>
      <div className="flex w-full flex-col gap-4">
        {styles.map((s) => (
          <div key={s.name} className="bg-base-200 rounded-xl p-4 text-left">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base-content text-sm font-bold">
                {s.name}
              </span>
              <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                {s.era}
              </span>
            </div>
            <p className="text-neutral mb-1 text-xs leading-relaxed">
              {s.description}
            </p>
            <p className="text-base-content/60 text-[11px] italic">
              {s.characteristics}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

StyleGuide.displayName = 'StyleGuide';
