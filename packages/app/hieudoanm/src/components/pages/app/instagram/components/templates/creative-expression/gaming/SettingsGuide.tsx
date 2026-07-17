import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Setting {
  name: string;
  value: string;
  recommendation: string;
}

export const SettingsGuide: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Optimal Settings';
  const game = (data.game as string) ?? 'Game Title';
  const description =
    (data.description as string) ?? 'Best settings for competitive play';
  const settings =
    (data.settings as Setting[]) ??
    ([
      { name: 'Graphics', value: 'Ultra', recommendation: 'Medium' },
    ] as Setting[]);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-0.5 text-4xl font-bold">{title}</h1>
      <div className="mb-0.5 flex items-center gap-1">
        <span className="bg-accent/10 text-accent rounded-full px-1.5 py-0.5 text-xs font-bold">
          {game}
        </span>
      </div>
      <p className="text-neutral mb-2 text-xs">{description}</p>
      <div className="flex flex-1 flex-col gap-1">
        <div className="text-base-300 flex text-xs font-bold tracking-wider uppercase">
          <span className="w-2/5">Setting</span>
          <span className="w-1/5 text-center">Default</span>
          <span className="w-2/5 text-right">Recommended</span>
        </div>
        {settings.map((item, i) => (
          <div
            key={i}
            className="bg-base-200 flex items-center rounded-lg px-2 py-1.5">
            <span className="text-base-content w-2/5 text-xs font-semibold">
              {item.name}
            </span>
            <span className="text-neutral w-1/5 text-center text-xs">
              {item.value}
            </span>
            <span className="text-success w-2/5 text-right text-xs font-bold">
              {item.recommendation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

SettingsGuide.displayName = 'SettingsGuide';
