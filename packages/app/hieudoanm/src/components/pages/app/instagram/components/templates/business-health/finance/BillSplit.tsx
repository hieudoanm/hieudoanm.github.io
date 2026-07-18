import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const BillSplit: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Dinner Bill';
  const total = (data.total as string) ?? '$186.50';
  const people = (data.people as string) ?? '4 people';
  const each = (data.each as string) ?? '$46.63 each';
  const items = (data.items as { name: string; amount: string }[]) ?? [
    { name: 'Food', amount: '$142.00' },
    { name: 'Drinks', amount: '$28.50' },
    { name: 'Tax', amount: '$16.00' },
  ];

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <p className="text-neutral mb-1 text-xs font-bold tracking-wider uppercase">
        {headline}
      </p>
      <p className="text-primary text-4xl font-black">
        <strong>{total}</strong>
      </p>
      <div className="bg-accent/10 text-accent mt-3 inline-block self-start rounded-full px-4 py-1 text-sm font-bold">
        {each}
      </div>
      <p className="text-neutral mt-2 text-xs">{people}</p>
      <ul className="mt-6 flex flex-1 flex-col gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="border-base-300 flex items-center justify-between border-b pb-2">
            <span className="text-base-content text-sm">{item.name}</span>
            <span className="text-base-content text-sm font-semibold">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

BillSplit.displayName = 'BillSplit';
