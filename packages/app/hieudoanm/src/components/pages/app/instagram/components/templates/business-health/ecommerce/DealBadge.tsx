import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const DealBadge: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Limited Time Offer';
  const originalPrice = (data.originalPrice as string) ?? '$99.99';
  const dealPrice = (data.dealPrice as string) ?? '$49.99';
  const discount = (data.discount as string) ?? '50% OFF';
  const badge = (data.badge as string) ?? 'DEAL';
  const cta = (data.cta as string) ?? 'Shop Now';

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <div className="bg-accent text-base-100 mb-6 self-start rounded px-3 py-1 text-xs font-bold tracking-wider uppercase">
        {badge}
      </div>
      <p className="text-neutral mb-2 text-sm">{headline}</p>
      <p className="text-primary text-2xl font-black">
        <strong>{dealPrice}</strong>
      </p>
      <p className="text-neutral mt-1 text-lg line-through">{originalPrice}</p>
      <div className="bg-primary/10 text-primary mt-3 rounded-full px-4 py-1 text-sm font-bold">
        {discount}
      </div>
      <div className="bg-primary text-primary-content mt-6 rounded-full px-8 py-2.5 text-sm font-bold tracking-wider uppercase">
        {cta}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

DealBadge.displayName = 'DealBadge';
