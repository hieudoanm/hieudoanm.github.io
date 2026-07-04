import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ProsCons: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const pros = (data.pros as string[]) ?? [];
  const cons = (data.cons as string[]) ?? [];
  const proList =
    pros.length > 0 ? pros : ['Fast setup', 'Low cost', 'Easy to use'];
  const conList =
    cons.length > 0 ? cons : ['Limited features', 'Steep learning curve'];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg-accent/10 px-10 py-5">
        <h1 className="text-base-content text-center text-2xl font-bold tracking-tight">
          {headline || 'Pros & Cons'}
        </h1>
      </div>
      <div className="flex flex-1">
        <div className="flex w-1/2 flex-col gap-3 p-8">
          <span className="text-success mb-2 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Pros
          </span>
          {proList.map((item, i) => (
            <p key={i} className="text-base-content text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>
        <div className="bg-accent/20 flex w-0.5 flex-shrink-0" />
        <div className="flex w-1/2 flex-col gap-3 p-8">
          <span className="text-error mb-2 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cons
          </span>
          {conList.map((item, i) => (
            <p key={i} className="text-base-content text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

ProsCons.displayName = 'ProsCons';
