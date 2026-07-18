import { FC } from 'react';

const FilterCard: FC = () => (
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

const CalendarCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={`h${i}`} className="text-base-content/50 font-medium">
            {d}
          </div>
        ))}
        {[12, 13, 14, 15, 16, 17, 18].map((day) => (
          <div
            key={day}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              day === 14 ? 'bg-primary text-primary-content' : ''
            }`}>
            {day}
          </div>
        ))}
      </div>
      <div className="divider my-1" />
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="toggle toggle-sm toggle-primary" />
          Show all day events
        </label>
      </div>
      <input
        type="text"
        placeholder="Search for events"
        className="input input-sm input-bordered mt-2 w-full"
      />
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="badge badge-sm badge-neutral">1h</span>
        Team Sync Meeting
      </div>
    </div>
  </div>
);

const TabsCard: FC = () => (
  <div className="tabs tabs-lift">
    <input
      type="radio"
      name="demo_tabs"
      className="tab"
      aria-label="Tab 1"
      defaultChecked
    />
    <div className="tab-content bg-base-100 border-base-300 p-6">
      Tab content 1
    </div>
    <input type="radio" name="demo_tabs" className="tab" aria-label="Tab 2" />
    <div className="tab-content bg-base-100 border-base-300 p-6">
      Tab content 2
    </div>
    <input type="radio" name="demo_tabs" className="tab" aria-label="Tab 3" />
    <div className="tab-content bg-base-100 border-base-300 p-6">
      Tab content 3
    </div>
  </div>
);

const PriceRangeCard: FC = () => (
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

const ProductCard: FC = () => (
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

const SearchJoin: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
    <div className="card-body">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered join-item w-full"
        />
        <button className="btn btn-neutral join-item">Find</button>
      </div>
    </div>
  </div>
);

const RegistrationCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <h3 className="card-title text-sm">Create new account</h3>
      <div className="form-control">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-sm w-full"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-sm w-full"
        />
      </div>
      <div className="status status-error" />
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <input type="checkbox" className="toggle toggle-xs" />
          Accept terms without reading
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <input type="checkbox" className="toggle toggle-xs" />
          Subscribe to spam emails
        </label>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary btn-sm">Register</button>
      </div>
      <a href="#" className="link link-primary text-xs">
        Or login
      </a>
    </div>
  </div>
);

export const DemoColumn1: FC = () => (
  <div className="flex flex-col gap-4">
    <FilterCard />
    <CalendarCard />
    <TabsCard />
    <PriceRangeCard />
    <ProductCard />
    <SearchJoin />
    <RegistrationCard />
  </div>
);
DemoColumn1.displayName = 'DemoColumn1';
