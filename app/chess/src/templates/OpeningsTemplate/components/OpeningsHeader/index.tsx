'use client';

import { Heading, Select } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';

export type OpeningsHeaderProperties = {
  ecos: string[];
  total: number;
};

export const OpeningsHeader: React.FC<OpeningsHeaderProperties> = ({
  ecos = [],
  total = 0,
}) => {
  const [eco, setECO] = useSearchParameter('eco');

  return (
    <div className="flex items-center justify-between">
      <Heading>Openings ({total})</Heading>
      <div>
        <Select
          aria-label="ECO"
          id="eco"
          name="eco"
          className="shadow"
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
        </Select>
      </div>
    </div>
  );
};
