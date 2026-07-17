import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ExpenseLog: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const expenses =
    (data.expenses as { category: string; amount: string; date: string }[]) ??
    [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-6 text-4xl font-bold">{title}</h1>
      <div className="flex flex-col gap-3">
        {expenses.map((exp, i) => (
          <div
            key={i}
            className="border-base-300 flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <span className="rounded-box bg-accent/10 text-accent px-2 py-0.5 text-xs font-bold">
                {exp.category}
              </span>
              <span className="text-neutral text-xs">{exp.date}</span>
            </div>
            <span className="text-base-content text-sm font-semibold">
              {exp.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

ExpenseLog.displayName = 'ExpenseLog';
