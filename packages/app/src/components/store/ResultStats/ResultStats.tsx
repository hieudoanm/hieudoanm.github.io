import { FC } from 'react';

export const ResultStats: FC<{ shown: number; total: number }> = ({
  shown = 0,
  total = 0,
}) => {
  return (
    <div className="mb-4 text-sm opacity-70">
      Showing <strong>{shown}</strong> of <strong>{total}</strong> apps
    </div>
  );
};
