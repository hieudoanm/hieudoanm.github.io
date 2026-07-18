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
  const citation = (data.citation as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center overflow-hidden p-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-base-content mb-1 text-4xl font-bold tracking-tight">
            {headline}
          </h1>
          {text && <p className="text-neutral mb-1 text-xs">{text}</p>}
        </div>
        <ul className="flex min-h-0 flex-1 flex-col gap-1">
          {list.map((item, i) => (
            <li
              key={i}
              className="rounded-box bg-accent/5 flex items-center gap-1 px-2 py-1">
              <div className="bg-primary/20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
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
              <span className="text-base-content text-xs leading-snug font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
        {citation && (
          <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
            {citation}
          </p>
        )}
      </div>
    </div>
  );
};

Checklist.displayName = 'Checklist';
