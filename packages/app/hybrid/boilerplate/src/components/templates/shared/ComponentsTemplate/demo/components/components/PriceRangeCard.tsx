import { FC } from 'react';

export const PriceRangeCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
    <div className="card-body items-center text-center">
      <div className="text-5xl font-extralight">50</div>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="range range-sm w-full"
      />
    </div>
  </div>
);

PriceRangeCard.displayName = 'PriceRangeCard';
