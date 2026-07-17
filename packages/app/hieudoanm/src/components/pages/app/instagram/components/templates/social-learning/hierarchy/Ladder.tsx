import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Rung {
  label: string;
  items: string[];
}

export const Ladder: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Ladder';
  const text = (data.text as string) ?? '';
  const rungs = (data.rungs as Rung[]) ?? [
    { label: 'Expert', items: ['Mastery level'] },
    { label: 'Advanced', items: ['Deep knowledge', 'Leadership'] },
    { label: 'Intermediate', items: ['Working knowledge'] },
    { label: 'Beginner', items: ['Getting started'] },
    { label: 'Novice', items: ['First steps'] },
  ];

  const colors = ['#ff0030', '#d90029', '#b30022', '#8c001b', '#660014'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-3 text-center">
        <h2 className="text-base-content text-sm font-bold">{title}</h2>
        {text && <div className="text-neutral mt-2 text-sm">{text}</div>}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2">
        {[...rungs].reverse().map((rung, i) => {
          const idx = rungs.length - 1 - i;
          return (
            <div key={i} className="flex items-center gap-2">
              <div className="flex w-28 shrink-0 flex-col items-end justify-center">
                <span className="text-base-content text-sm font-bold">
                  {rung.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-1 w-4 rounded-2xl"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <div
                  className="rounded-r-2xl px-4 py-2"
                  style={{ backgroundColor: colors[idx % colors.length] }}>
                  <ul className="flex flex-wrap gap-2">
                    {rung.items.map((item, j) => (
                      <li key={j} className="text-sm font-medium text-white">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Ladder.displayName = 'Ladder';
