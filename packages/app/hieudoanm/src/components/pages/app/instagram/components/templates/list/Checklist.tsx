import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Checklist: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const list =
    items.length > 0
      ? items
      : ['Task one', 'Task two', 'Task three', 'Task four'];

  return (
    <div className="bg-base-100100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-8 text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <div className="flex flex-1 flex-col gap-4">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="bg-primary/20 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
              <svg
                className="text-primary h-4 w-4"
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
            </div>
            <span className="text-base-content text-base leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Checklist.displayName = 'Checklist';
