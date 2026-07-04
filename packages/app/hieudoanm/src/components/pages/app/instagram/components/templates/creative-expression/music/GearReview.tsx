import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const GearReview: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? 'Gear Review';
  const category = (data.category as string) ?? '';
  const rating = (data.rating as number) ?? 0;
  const price = (data.price as string) ?? '';
  const pros = (data.pros as string[]) ?? [];
  const cons = (data.cons as string[]) ?? [];

  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Gear Review
      </span>
      <h1 className="text-base-content mt-1 text-xl font-bold">{name}</h1>
      {category && (
        <span className="bg-base-200 text-neutral mt-1 rounded px-2 py-0.5 text-[10px] font-bold">
          {category}
        </span>
      )}
      <div className="mt-2 flex gap-1">
        {stars.map((filled, i) => (
          <span
            key={i}
            className={
              filled ? 'text-primary text-lg' : 'text-base-300 text-lg'
            }>
            ★
          </span>
        ))}
      </div>
      {price && (
        <p className="text-base-content mt-2 text-lg font-black">{price}</p>
      )}
      <div className="mt-4 w-full max-w-xs space-y-2">
        {pros.length > 0 && (
          <div className="text-left">
            <p className="text-success mb-1 text-[10px] font-bold uppercase">
              Pros
            </p>
            {pros.map((pro, i) => (
              <p key={i} className="text-base-content text-xs">
                ✓ {pro}
              </p>
            ))}
          </div>
        )}
        {cons.length > 0 && (
          <div className="text-left">
            <p className="text-error mb-1 text-[10px] font-bold uppercase">
              Cons
            </p>
            {cons.map((con, i) => (
              <p key={i} className="text-base-content text-xs">
                ✗ {con}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
GearReview.displayName = 'GearReview';
