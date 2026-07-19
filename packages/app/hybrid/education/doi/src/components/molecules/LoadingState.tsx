import { FC } from 'react';

const LoadingState: FC = () => (
  <div className="grid gap-4 sm:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton h-28 w-full rounded-lg" />
    ))}
  </div>
);

export default LoadingState;
