'use client';

import { Tag, TagCloseButton } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import names from '@chess/common/json/names.json';
import { ChessCountry, ChessTitle } from '@prisma/client';
import { ChangeEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

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
    <>
      <header>
        <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
          <div className="col-span-1">
            <h1 className="text-center text-xl md:text-left md:text-3xl">
              Titled ({total})
            </h1>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
              <div className="col-span-1">
                <select
                  aria-label="Title"
                  id="title"
                  name="title"
                  className="shadow select select-bordered"
                  value={title}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const newTitle: string = event.target.value;
                    setTitle(newTitle);
                  }}>
                  <option value="">Title</option>
                  {titles.map(({ abbreviation, title }) => (
                    <option key={abbreviation} value={abbreviation}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <select
                  aria-label="Country"
                  id="country"
                  name="country"
                  className="shadow select select-bordered"
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
                </select>
              </div>
              <div className="col-span-1">
                <select
                  id="timeRange"
                  name="timeRange"
                  className="shadow select select-bordered"
                  value={timeRange}
                  onChange={(event) => {
                    const newTimeRange: string = event.target.value;
                    setTimeRange(newTimeRange);
                  }}>
                  <option>Time Range</option>
                  <option value="week">7 Days</option>
                  <option value="month">30 Days</option>
                  <option value="quarter">90 Days</option>
                  <option value="year">1 Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
      {title || countryCode || timeRange ? (
        <>
          <div className="divider" />
          <div className="flex items-center gap-x-4">
            {title ? (
              <>
                Title:
                <Tag size="lg" colorScheme="teal">
                  {title}
                  <TagCloseButton
                    type="button"
                    as={FaTimes}
                    onClick={() => setTitle('')}
                  />
                </Tag>
              </>
            ) : (
              <></>
            )}
            {countryCode ? (
              <>
                Country:
                <Tag size="lg" colorScheme="teal">
                  {(names as Record<string, string>)[countryCode]}
                  <TagCloseButton
                    type="button"
                    as={FaTimes}
                    onClick={() => setCountryCode('')}
                  />
                </Tag>
              </>
            ) : (
              <></>
            )}
            {timeRange ? (
              <>
                Time Range:
                <Tag size="lg" colorScheme="teal">
                  {timeRange.toUpperCase()}
                  <TagCloseButton
                    type="button"
                    as={FaTimes}
                    onClick={() => setTimeRange('')}
                  />
                </Tag>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="divider" />
    </>
  );
};

PlayersHeader.displayName = 'PlayersHeader';
