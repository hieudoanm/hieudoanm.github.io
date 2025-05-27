import { FC } from 'react';

export const Stats: FC = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded border border-neutral-200 bg-white p-6 shadow-md">
      <p className="text-neutral-700">Stats</p>
      <p className="text-2xl font-black">$300.00</p>
      <p className="text-red-700">3.0%</p>
    </div>
  );
};
