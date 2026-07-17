import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MissionStatement: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const mission = (data.mission as string) ?? '';
  const vision = (data.vision as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center gap-4 p-8">
      <div>
        <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
          {headline}
        </span>
        <p className="text-base-content mt-4 text-4xl leading-snug font-bold">
          {mission}
        </p>
      </div>
      {vision && (
        <div className="border-accent/20 border-t pt-6">
          <span className="text-neutral/60 text-sm font-bold tracking-[0.2em] uppercase">
            Vision
          </span>
          <p className="text-neutral mt-2 text-sm leading-relaxed">{vision}</p>
        </div>
      )}
    </div>
  );
};

MissionStatement.displayName = 'MissionStatement';
