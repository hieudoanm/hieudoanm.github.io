import { FC } from 'react';

export const PayoffMatrix: FC = () => (
  <div className="border-base-300 overflow-hidden rounded-lg border text-center text-[10px]">
    <div className="border-base-300 bg-base-200 grid grid-cols-3 border-b font-normal">
      <div className="p-1" />
      <div className="p-1">🤝 Coop</div>
      <div className="p-1">🔪 Defect</div>
    </div>
    <div className="border-base-300 grid grid-cols-3 border-b">
      <div className="bg-base-200 p-1 font-normal">🤝 Coop</div>
      <div className="text-success p-1">1yr, 1yr</div>
      <div className="text-error p-1">3yr, 0yr</div>
    </div>
    <div className="grid grid-cols-3">
      <div className="bg-base-200 p-1 font-normal">🔪 Defect</div>
      <div className="text-error p-1">0yr, 3yr</div>
      <div className="p-1">2yr, 2yr</div>
    </div>
  </div>
);
PayoffMatrix.displayName = 'PayoffMatrix';
