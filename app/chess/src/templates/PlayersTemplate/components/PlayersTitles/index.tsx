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
      <div className="rounded border">
        <div className="collapse collapse-arrow border-0">
          <div className="collapse-title border-b">
            <div className="flex w-full items-center justify-between">
              <div className="flex-grow text-left">Titles ({total})</div>
            </div>
          </div>
          <div className="p-0 collapse-content">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="col-span-1">
                <PlayersTitlesChart titles={titles} />
              </div>
              <div className="col-span-1 ">
                <div className="border-t border-l-0 md:border-t-0 md:border-l border-gray-200">
                  <PlayersTitlesTable titles={titles} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider m-0" />
    </>
  );
};
