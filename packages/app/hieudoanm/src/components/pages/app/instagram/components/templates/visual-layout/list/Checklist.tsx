import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Checklist: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const list =
    items.length > 0
      ? items
      : ['Task one', 'Task two', 'Task three', 'Task four'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col overflow-hidden px-6 py-5">
      <h1 className="text-base-content mb-1 text-2xl font-bold tracking-tight">
        {headline}
      </h1>
      {text && <p className="text-neutral mb-2 text-xs">{text}</p>}
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {list.map((item, i) => (
          <div
            key={i}
            className="rounded-box bg-accent/5 flex items-center gap-3 px-4 py-2.5">
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
            <span className="text-base-content text-sm leading-snug font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Checklist.displayName = 'Checklist';
