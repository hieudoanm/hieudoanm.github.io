import { FC } from 'react';

export const ProductCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
    <figure className="px-10 pt-10">
      <div className="bg-base-300 h-40 w-full rounded-xl" />
    </figure>
    <div className="card-body">
      <div className="flex items-center justify-between">
        <h3 className="card-title">Nike Shoes</h3>
        <span className="badge badge-success badge-sm">SALE</span>
      </div>
      <div className="rating rating-xs">
        {[1, 2, 3, 4, 5].map((i) => (
          <input
            key={i}
            type="radio"
            name="rating-ProductCard"
            className={`mask mask-star-2 ${i <= 4 ? 'bg-orange-400' : 'bg-base-300'}`}
            defaultChecked={i === 4}
          />
        ))}
      </div>
      <div className="text-2xl font-semibold">
        $120{' '}
        <span className="text-base-content/40 text-sm line-through">$150</span>
      </div>
      <p className="text-base-content/50 text-xs">420 reviews</p>
    </div>
  </div>
);

ProductCard.displayName = 'ProductCard';
