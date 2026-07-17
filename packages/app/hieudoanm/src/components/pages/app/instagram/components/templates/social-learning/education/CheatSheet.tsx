import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Item {
  label: string;
  content: string;
}

export const CheatSheet: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Cheat Sheet';
  const subject = (data.subject as string) ?? 'JavaScript';
  const items = (data.items as Item[]) ?? [
    { label: 'Variable', content: 'let x = value' },
    { label: 'Constant', content: 'const x = value' },
    { label: 'Function', content: 'const fn = () => {}' },
    { label: 'Array Map', content: 'arr.map(x => x)' },
    { label: 'Fetch', content: 'await fetch(url)' },
    { label: 'Class', content: 'class Foo extends Bar {}' },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-3 text-center">
        <div className="text-primary text-sm font-bold tracking-widest uppercase">
          {subject}
        </div>
        <div className="text-base-content mt-2 text-sm font-bold">{title}</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-base-300 flex items-stretch gap-2 rounded-2xl border">
            <div className="bg-primary flex w-24 shrink-0 items-center justify-center rounded-l-2xl text-sm font-bold text-white">
              {item.label}
            </div>
            <div className="text-base-content flex flex-1 items-center px-2 font-mono text-sm">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CheatSheet.displayName = 'CheatSheet';
