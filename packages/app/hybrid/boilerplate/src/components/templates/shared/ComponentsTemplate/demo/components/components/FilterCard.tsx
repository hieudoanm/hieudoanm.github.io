import { FC } from 'react';

export const FilterCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
    <div className="card-body">
      <div className="mb-2 flex flex-wrap gap-2">
        {['Shoes', 'Bags'].map((tag) => (
          <span key={tag} className="badge badge-soft">
            {tag}
            <button className="btn btn-ghost btn-xs">✕</button>
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[
          { label: 'Hoodies', count: 25 },
          { label: 'Bags', count: 3 },
          { label: 'Shoes', count: 0 },
          { label: 'Accessories', count: 4 },
        ].map((item) => (
          <label key={item.label} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="checkbox checkbox-sm" />
            {item.label}
            <span className="badge badge-xs badge-neutral ml-auto">
              {item.count}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

FilterCard.displayName = 'FilterCard';
