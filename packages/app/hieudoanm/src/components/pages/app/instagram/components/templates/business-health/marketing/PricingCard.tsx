import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const PricingCard: FC<TemplateProps> = ({ data }) => {
  const plan = (data.plan as string) ?? '';
  const price = (data.price as string) ?? '';
  const features = (data.features as string[]) ?? [];
  const items =
    features.length > 0
      ? features
      : ['Feature one', 'Feature two', 'Feature three'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="bg-accent/10 text-accent mb-2 rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase">
        {plan}
      </span>
      <div className="text-base-content mb-6 text-3xl font-black tracking-tight">
        {price}
      </div>
      <div className="flex flex-col gap-3">
        {items.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <svg
              className="text-primary h-4 w-4 flex-shrink-0"
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
            <span className="text-neutral text-sm">{f}</span>
          </div>
        ))}
      </div>
      <div className="rounded-box bg-primary text-primary-content mt-8 px-8 py-3 text-sm font-bold tracking-wider uppercase">
        Get Started
      </div>
    </div>
  );
};

PricingCard.displayName = 'PricingCard';
