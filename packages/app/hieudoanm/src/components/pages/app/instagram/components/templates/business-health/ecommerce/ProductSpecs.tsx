import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Spec {
  label: string;
  value: string;
}

export const ProductSpecs: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? 'Product Name';
  const tagline = (data.tagline as string) ?? 'Your product tagline here';
  const specs = (data.specs as Spec[]) ?? [
    { label: 'Material', value: 'Aluminum' },
    { label: 'Weight', value: '250g' },
    { label: 'Dimensions', value: '10 × 5 × 2 cm' },
    { label: 'Warranty', value: '2 Years' },
  ];

  return (
    <div className="bg-base-100 border-t-primary flex h-full w-full flex-col border-t-4 p-6">
      <div className="mb-4">
        <h1 className="text-base-content text-lg font-bold">{name}</h1>
        <p className="text-neutral text-sm">{tagline}</p>
      </div>
      <div className="flex flex-1 flex-col gap-0">
        {specs.map((s, i) => (
          <div
            key={i}
            className={`border-base-300 flex items-center justify-between border-b px-3 py-2 ${i % 2 === 1 ? 'bg-base-200/50' : ''}`}>
            <span className="text-neutral text-xs">{s.label}</span>
            <span className="text-base-content text-xs font-semibold">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductSpecs.displayName = 'ProductSpecs';
