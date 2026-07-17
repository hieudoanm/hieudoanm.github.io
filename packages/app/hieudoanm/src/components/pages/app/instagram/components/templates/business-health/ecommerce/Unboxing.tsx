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
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-neutral text-xs font-bold tracking-widest uppercase">
          {title}
        </h1>
        <h2 className="text-primary mt-2 text-2xl font-black">{product}</h2>
        <h3 className="text-primary mt-3 text-xs font-bold tracking-wider uppercase">
          What's inside
        </h3>
        <ul className="mt-3 flex flex-col gap-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="border-base-300 rounded border px-4 py-1.5 text-xs font-medium">
              {item}
            </li>
          ))}
        </ul>
        {text && <p className="text-neutral mt-3 text-sm">{text}</p>}
      </div>
    </div>
  );
};

Unboxing.displayName = 'Unboxing';
