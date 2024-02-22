'use client';

import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { PageHeading } from '@chess/shared/components/PageHeading';

export type OpeningsHeaderProperties = {
  ecos: string[];
  total: number;
};

export const OpeningsHeader: React.FC<OpeningsHeaderProperties> = ({
  ecos = [],
  total = 0,
}) => {
  const [eco, setECO] = useSearchParameter('eco');
  const [limit, setLimit] = useSearchParameter('limit', '100');

  return (
    <div className="flex items-center justify-between">
      <PageHeading>Openings ({total})</PageHeading>
      <div className="join shadow">
        <select
          aria-label="ECO"
          id="eco"
          name="eco"
          className="join-item select select-bordered shadow"
          value={eco}
          onChange={(event) => {
            const newECO: string = event.target.value;
            setECO(newECO);
          }}>
          <option value="">ECO</option>
          {ecos.map((eco) => (
            <option key={eco} value={eco}>
              {eco}
            </option>
          ))}
        </select>
        <select
          aria-label="Limit"
          id="limit"
          name="limit"
          className="join-item select select-bordered shadow"
          value={limit}
          onChange={(event) => {
            const newLimit: string = event.target.value;
            setLimit(newLimit);
          }}>
          <option value={100}>100</option>
          <option value={1000}>1000</option>
          <option value={10_000}>10000</option>
        </select>
      </div>
    </div>
  );
};
