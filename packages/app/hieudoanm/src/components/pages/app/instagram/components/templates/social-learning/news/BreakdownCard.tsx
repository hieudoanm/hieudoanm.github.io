import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

interface BreakdownPoint {
  title: string;
  detail: string;
}

export const BreakdownCard: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Market Rally Explained';
  const summary =
    (data.summary as string) ??
    'Three key factors drove the S&P 500 to new highs this quarter.';
  const points = (data.points as BreakdownPoint[]) ?? [
    {
      title: 'Tech Earnings',
      detail: 'Major tech companies exceeded expectations',
    },
    { title: 'Fed Policy', detail: 'Interest rate hold signaled stability' },
    { title: 'Consumer Confidence', detail: 'Spending indices rose 4.2%' },
  ];

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <h1 className="text-base-content text-4xl leading-tight font-black">
        {headline}
      </h1>
      <p className="text-base-content/70 mt-4 text-sm leading-relaxed italic">
        {summary}
      </p>
      <div className="bg-base-200 rounded-box mt-6 flex-1 p-4">
        <ul className="flex flex-col gap-3">
          {points.map((point, i) => (
            <li key={i} className="flex gap-4">
              <span className="bg-primary text-primary-content flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-base-content text-sm font-bold">
                  {point.title}
                </p>
                <p className="text-base-content/70 text-sm leading-snug">
                  {point.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

BreakdownCard.displayName = 'BreakdownCard';
