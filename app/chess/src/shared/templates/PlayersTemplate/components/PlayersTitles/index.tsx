import { ChessTitleAbbreviation } from '@prisma/client';
import React from 'react';
import { PlayersTitlesChart } from '../PlayersTitlesChart';
import { PlayersTitlesTable } from '../PlayersTitlesTable';

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type PlayersTitlesProperties = { titles: TitleTotal[] };

export const PlayersTitles: React.FC<PlayersTitlesProperties> = ({
  titles = [],
}) => {
  if (titles.length === 0) return <></>;

  const total: number = titles.reduce(
    (previousValue: number, { total }) => previousValue + total,
    0
  );

  return (
    <>
      <p className="text-center text-lg md:text-left md:text-2xl">
        Titles ({titles.length})
      </p>
      <div className="rounded border shadow">
        <div className="border-b px-8 py-4">Titles ({total})</div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1">
            <PlayersTitlesChart titles={titles} />
          </div>
          <div className="col-span-1 ">
            <div className="border-l-0 border-t border-gray-200 md:border-l md:border-t-0">
              <PlayersTitlesTable titles={titles} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider m-0" />
    </>
  );
};
