import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Discussion: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Discussion';
  const interpretation =
    (data.interpretation as string) ??
    'The results support the hypothesis that X has a significant effect on Y, consistent with prior research.';
  const implications = (data.implications as string[]) ?? [
    'Findings advance theoretical understanding of X–Y relationship',
    'Practical applications for intervention design',
    'Opens new avenues for longitudinal research',
  ];
  const futureDirections = (data.futureDirections as string[]) ?? [
    'Replicate with larger, more diverse sample',
    'Examine long-term effects over 12 months',
    'Explore mediating mechanisms',
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        Discussion
      </span>
      <h1 className="text-base-content text-xl leading-tight font-bold">
        {title}
      </h1>

      <div className="bg-base-200 mt-5 rounded-lg p-4">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Interpretation
        </span>
        <p className="text-base-content mt-1 text-xs leading-relaxed">
          {interpretation}
        </p>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Implications
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {implications.map((imp, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="bg-accent mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span className="text-base-content text-xs leading-relaxed">
                {imp}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Future Directions
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {futureDirections.map((fd, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-accent mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                {i + 1}
              </span>
              <span className="text-base-content text-xs leading-relaxed">
                {fd}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Discussion.displayName = 'Discussion';
