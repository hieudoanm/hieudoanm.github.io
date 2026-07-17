import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Tier {
  label: string;
  color: string;
  items: string[];
}

export const TierList: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Tier List';
  const text = (data.text as string) ?? '';
  const tiers = (data.tiers as Tier[]) ?? [
    { label: 'S', color: '#ff0030', items: ['The GOAT', 'Absolute classic'] },
    { label: 'A', color: '#d90029', items: ['Great pick', 'Solid choice'] },
    { label: 'B', color: '#b30022', items: ['Good', 'Above average'] },
    { label: 'C', color: '#8c001b', items: ['Decent', 'Middle of the road'] },
    { label: 'D', color: '#660014', items: ['Below average'] },
    { label: 'F', color: '#40000d', items: ['Skip this', 'Not recommended'] },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-base-content text-sm font-bold">{title}</div>
        {text && <div className="text-neutral mt-2 text-sm">{text}</div>}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {tiers.map((tier, i) => (
          <div key={i} className="flex flex-1 items-stretch gap-2">
            <div
              className="flex w-10 items-center justify-center rounded-2xl text-sm font-black text-white"
              style={{ backgroundColor: tier.color }}>
              {tier.label}
            </div>
            <div className="border-base-300 flex flex-1 flex-wrap items-center justify-center gap-2 rounded-2xl border px-4 py-2">
              {tier.items.map((item, j) => (
                <span
                  key={j}
                  className="bg-base-200 text-base-content rounded-2xl px-2 py-2 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TierList.displayName = 'TierList';
