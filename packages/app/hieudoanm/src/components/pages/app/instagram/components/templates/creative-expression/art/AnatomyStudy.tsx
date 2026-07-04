import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Note {
  area: string;
  description: string;
}

export const AnatomyStudy: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Anatomy Study';
  const subject = (data.subject as string) ?? '';
  const notes = (data.notes as Note[]) ?? [
    { area: 'Skeletal', description: 'Bone structure and joints' },
    { area: 'Muscular', description: 'Muscle groups and tension' },
    { area: 'Proportions', description: 'Head-to-body ratios' },
  ];
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {title}
      </h1>
      {subject && (
        <p className="text-primary mb-5 text-sm font-semibold">{subject}</p>
      )}
      <div className="mb-5 grid w-full grid-cols-2 gap-3">
        {notes.map((n) => (
          <div key={n.area} className="bg-base-200 rounded-xl p-3 text-left">
            <span className="text-primary text-[11px] font-bold tracking-wider uppercase">
              {n.area}
            </span>
            <p className="text-neutral mt-1 text-xs leading-relaxed">
              {n.description}
            </p>
          </div>
        ))}
      </div>
      {tip && (
        <div className="bg-accent/10 text-accent rounded-lg px-4 py-2 text-xs font-medium">
          {tip}
        </div>
      )}
    </div>
  );
};

AnatomyStudy.displayName = 'AnatomyStudy';
