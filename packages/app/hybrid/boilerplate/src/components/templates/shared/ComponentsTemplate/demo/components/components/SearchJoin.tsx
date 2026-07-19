import { FC } from 'react';

export const SearchJoin: FC = () => (
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

SearchJoin.displayName = 'SearchJoin';
