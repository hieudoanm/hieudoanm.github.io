'use client';

import { Heading, Select } from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessTitle } from '@prisma/client';

export type PlayersHeaderProperties = {
  total: number;
  titles: { title: ChessTitle }[];
  countries: { countryCode: string }[];
};

export const PlayersHeader: React.FC<PlayersHeaderProperties> = ({
  total = 0,
  titles = [],
  countries = [],
}) => {
  const [countryCode, setCountryCode] = useSearchParameter('countryCode');
  const [title, setTitle] = useSearchParameter('title');

  return (
    <div className="flex items-center justify-between">
      <Heading>Players ({total})</Heading>
      <div className="flex items-center gap-x-2">
        <Select
          aria-label="Title"
          id="title"
          name="title"
          className="shadow"
          value={title}
          onChange={(event) => {
            const newTitle: string = event.target.value;
            setTitle(newTitle);
          }}>
          <option value="">Title</option>
          {titles.map(({ title }) => (
            <option key={title} value={title}>
              {TITLED_ABBREVIATIONS[title]}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Country"
          id="country"
          name="country"
          className="shadow"
          value={countryCode}
          onChange={(event) => {
            const newCountryCode: string = event.target.value;
            setCountryCode(newCountryCode);
          }}>
          <option value="">Country</option>
          {countries.map(({ countryCode }) => (
            <option key={countryCode} value={countryCode}>
              {countryCode}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

PlayersHeader.displayName = 'PlayersHeader';
