'use client';

import { Heading, Select } from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { ChessTitle } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParameters = useSearchParams();
  const title: ChessTitle =
    (searchParameters.get('title') as ChessTitle) ?? undefined;
  const countryCode: string = searchParameters.get('countryCode') ?? '';

  return (
    <div className="flex items-center justify-between">
      <Heading>Players ({total})</Heading>
      <div className="flex items-center gap-x-2">
        <Select
          aria-label="Title"
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            const newTitle: string = event.target.value;
            const newSearchParameters = new URLSearchParams(searchParameters);
            newSearchParameters.set('title', newTitle);
            const href: string = `${pathname}?${newSearchParameters.toString()}`;
            router.push(href);
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
          value={countryCode}
          onChange={(event) => {
            const newCountryCode: string = event.target.value;
            const newSearchParameters = new URLSearchParams(searchParameters);
            newSearchParameters.set('countryCode', newCountryCode);
            const href: string = `${pathname}?${newSearchParameters.toString()}`;
            router.push(href);
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
