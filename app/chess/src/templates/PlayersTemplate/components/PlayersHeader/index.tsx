'use client';

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
            <p className="text-center text-xl md:text-left md:text-3xl">
              Titled ({total})
            </p>
          </div>
          <div className="col-span-2">
            <div className="join shadow w-full">
              <select
                aria-label="Title"
                id="title"
                name="title"
                className="select select-bordered join-item w-full"
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
              <select
                aria-label="Country"
                id="country"
                name="country"
                className="select select-bordered join-item w-full"
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
              <select
                id="timeRange"
                name="timeRange"
                className="select select-bordered join-item w-full"
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
      </header>
      {title || countryCode || timeRange ? (
        <>
          <div className="divider m-0" />
          <div className="flex items-center gap-x-4">
            {title ? (
              <>
                Title:
                <div className="badge bg-teal-500 text-white">
                  {title}
                  <FaTimes onClick={() => setTitle('')} />
                </div>
              </>
            ) : (
              <></>
            )}
            {countryCode ? (
              <>
                Country:
                <div className="badge bg-teal-500 text-white">
                  {(names as Record<string, string>)[countryCode]}
                  <FaTimes onClick={() => setCountryCode('')} />
                </div>
              </>
            ) : (
              <></>
            )}
            {timeRange ? (
              <>
                Time Range:
                <div className="badge bg-teal-500 text-white">
                  {timeRange.toUpperCase()}
                  <FaTimes onClick={() => setTimeRange('')} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="divider m-0" />
    </>
  );
};

PlayersHeader.displayName = 'PlayersHeader';
