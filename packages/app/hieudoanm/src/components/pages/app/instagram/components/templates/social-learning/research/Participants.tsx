import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Demographic {
  label: string;
  value: string;
}

export const Participants: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Participants';
  const sampleSize = (data.sampleSize as string) ?? 'N = 240';
  const demographics = (data.demographics as Demographic[]) ?? [
    { label: 'Age', value: 'M = 28.4, SD = 6.2' },
    { label: 'Gender', value: '52% Female, 48% Male' },
    { label: 'Education', value: "78% Bachelor's or higher" },
  ];
  const method = (data.method as string) ?? 'Recruited via Prolific Academic';
  const criteria = (data.criteria as string[]) ?? [
    'Aged 18–65',
    'Native English speakers',
    'No prior exposure to study stimuli',
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        Participants
      </span>
      <h1 className="text-base-content text-xl leading-tight font-bold">
        {title}
      </h1>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-accent text-4xl font-black">{sampleSize}</span>
        <span className="text-neutral text-xs">total participants</span>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {demographics.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[#e5e7eb] pb-2">
            <span className="text-neutral text-xs font-medium">{d.label}</span>
            <span className="text-base-content text-xs font-semibold">
              {d.value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-base-200 mt-5 rounded-lg p-3">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Recruitment
        </span>
        <p className="text-base-content mt-1 text-xs">{method}</p>
      </div>

      <div className="mt-4">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Inclusion Criteria
        </span>
        <div className="mt-2 flex flex-col gap-1">
          {criteria.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="bg-accent h-1 w-1 flex-shrink-0 rounded-full" />
              <span className="text-base-content text-[11px]">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Participants.displayName = 'Participants';
