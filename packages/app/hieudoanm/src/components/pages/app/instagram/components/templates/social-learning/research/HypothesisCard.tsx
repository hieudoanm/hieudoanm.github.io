import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const HypothesisCard: FC<TemplateProps> = ({ data }) => {
  const hypothesis =
    (data.hypothesis as string) ??
    'Users who see personalized content engage 40% more';
  const variables = (data.variables as { name: string; type: string }[]) ?? [
    { name: 'Content type', type: 'Independent' },
    { name: 'Engagement rate', type: 'Dependent' },
  ];
  const method = (data.method as string) ?? 'A/B Testing';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        Hypothesis
      </span>
      <div className="bg-accent/10 rounded-box p-4">
        <p className="text-base-content text-sm leading-relaxed font-medium">
          {hypothesis}
        </p>
      </div>
      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Variables
        </span>
        <div className="bg-base-200 rounded-box mt-2 overflow-hidden">
          <div className="border-base-300 flex border-b px-3 py-2">
            <span className="text-neutral flex-1 text-[9px] font-bold uppercase">
              Name
            </span>
            <span className="text-neutral text-[9px] font-bold uppercase">
              Type
            </span>
          </div>
          {variables.map((v, i) => (
            <div
              key={i}
              className="border-base-300 flex items-center justify-between border-b px-3 py-2 last:border-b-0">
              <span className="text-base-content text-xs font-medium">
                {v.name}
              </span>
              <span className="bg-accent/10 text-accent rounded px-2 py-0.5 text-[10px] font-bold">
                {v.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-5">
        <span className="bg-base-200 text-neutral inline-flex items-center rounded px-3 py-1 text-[10px] font-bold">
          {method}
        </span>
      </div>
    </div>
  );
};
HypothesisCard.displayName = 'HypothesisCard';
