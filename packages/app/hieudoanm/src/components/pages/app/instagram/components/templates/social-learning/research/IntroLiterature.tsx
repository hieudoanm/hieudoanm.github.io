import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const IntroLiterature: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Research Paper';
  const question = (data.question as string) ?? 'What is the effect of X on Y?';
  const hypotheses = (data.hypotheses as string[]) ?? [
    'H₁: X has a significant effect on Y',
    'H₂: The effect is moderated by Z',
  ];
  const citations = (data.citations as string[]) ?? [
    'Smith et al. (2023)',
    'Johnson & Lee (2022)',
    'Williams (2021)',
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        Introduction &amp; Literature Review
      </span>
      <h1 className="text-base-content text-xl leading-tight font-bold">
        {title}
      </h1>

      <div className="bg-primary/5 mt-5 rounded-lg border border-[#ff0030]/10 p-4">
        <span className="text-accent text-[9px] font-bold tracking-[0.15em] uppercase">
          Research Question
        </span>
        <p className="text-base-content mt-1 text-sm leading-relaxed font-medium">
          {question}
        </p>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Hypotheses
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {hypotheses.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="bg-accent mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span className="text-base-content text-xs leading-relaxed">
                {h}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Key Literature
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {citations.map((c, i) => (
            <span
              key={i}
              className="bg-base-200 text-base-content rounded px-2 py-1 text-[10px] font-medium">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

IntroLiterature.displayName = 'IntroLiterature';
