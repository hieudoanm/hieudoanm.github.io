import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Unboxing: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Unboxing';
  const product = (data.product as string) ?? 'Pro Laptop 16"';
  const items = (data.items as string[]) ?? [
    'Laptop',
    'Charger',
    'USB-C cable',
    'Starter guide',
  ];
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="text-neutral text-xs font-bold tracking-widest uppercase">
          {title}
        </div>
        <div className="text-primary mt-2 text-2xl font-black">{product}</div>
        <div className="text-primary mt-3 text-xs font-bold tracking-wider uppercase">
          What's inside
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {items.map((item, i) => (
            <div
              key={i}
              className="border-base-300 rounded border px-4 py-1.5 text-xs font-medium">
              {item}
            </div>
          ))}
        </div>
        {text && <p className="text-neutral mt-3 text-sm">{text}</p>}
      </div>
    </div>
  );
};

Unboxing.displayName = 'Unboxing';
