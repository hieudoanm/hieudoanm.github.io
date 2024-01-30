'use client';

import { Heading, Select } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessCountry, ChessTitle } from '@prisma/client';

export type PlayersHeaderProperties = {
  total: number;
  titles: ChessTitle[];
  countries: ChessCountry[];
};

export const PlayersHeader: React.FC<PlayersHeaderProperties> = ({
  total = 0,
  titles = [],
  countries = [],
}) => {
  const [title, setTitle] = useSearchParameter('title');
  const [timeRange, setTimeRange] = useSearchParameter('timeRange');
  const [countryCode, setCountryCode] = useSearchParameter('countryCode');

  return (
    <header>
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
        <div className="col-span-1">
          <Heading className="text-center text-xl md:text-left md:text-3xl">
            Titled ({total})
          </Heading>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
            <div className="col-span-1">
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
                {titles.map(({ abbreviation, title }) => (
                  <option key={abbreviation} value={abbreviation}>
                    {title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-1">
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
                {countries.map(({ cca2, name, flag }) => (
                  <option key={cca2} value={cca2}>
                    {flag} {name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-span-1">
              <Select
                id="timeRange"
                name="timeRange"
                placeholder="Time Range"
                className="shadow"
                value={timeRange}
                onChange={(event) => {
                  const newTimeRange: string = event.target.value;
                  setTimeRange(newTimeRange);
                }}>
                <option value="week">7 Days</option>
                <option value="month">30 Days</option>
                <option value="quarter">90 Days</option>
                <option value="year">1 Year</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

PlayersHeader.displayName = 'PlayersHeader';
