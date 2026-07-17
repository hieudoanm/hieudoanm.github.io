import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Announcement: FC<TemplateProps> = ({ data }) => {
  const badge = (data.badge as string) ?? 'New';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const date = (data.date as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-6">
        <span className="bg-primary text-primary-content rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
          {badge}
        </span>
      </div>
      <h1 className="text-base-content mb-4 text-4xl leading-tight font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral mb-8 max-w-md text-base leading-relaxed">
        {text}
      </p>
      <div className="mt-auto">
        <div className="bg-accent/20 h-0.5 w-full rounded-full" />
        <p className="text-accent mt-4 text-sm font-medium tracking-wider uppercase">
          {date}
        </p>
      </div>
    </div>
  );
};

Announcement.displayName = 'Announcement';
