'use client';

import {
  Insights,
  OpeningCount,
} from '@chess/app/api/chess/players/[username]/insights/model';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { SectionHeading } from '@chess/shared/components/SectionHeading';
import { useState } from 'react';
import { FaBook, FaSquare, FaSquareMinus, FaSquarePlus } from 'react-icons/fa6';

const PlayerInsightsOpeningsBySide: React.FC<{ openings: OpeningCount[] }> = ({
  openings = [],
}) => {
  return (
    <div id="white" className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="p-0">Opening</th>
            <th>Moves</th>
            <th align="right">Total Games</th>
            <th className="w-1/2" />
          </tr>
        </thead>
        <tbody>
          {openings.map(({ opening, pgn, total, win, draw, loss }) => {
            const winPercentage: number = Number.parseFloat(
              ((win / total) * 100).toFixed(2)
            );
            const drawPercentage: number = Number.parseFloat(
              ((draw / total) * 100).toFixed(2)
            );
            const lossPercentage: number = Number.parseFloat(
              ((loss / total) * 100).toFixed(2)
            );
            return (
              <tr key={`${opening}-${pgn}`}>
                <td className="p-0">{opening}</td>
                <td>{pgn}</td>
                <td align="right">{total}</td>
                <td>
                  <div className="grid grid-cols-3 w-full">
                    <div className="col-span-1">
                      <div className="flex items-center gap-x-1">
                        <FaSquarePlus className="text-teal-500" />
                        <p className="text-sm md:text-base">{winPercentage}%</p>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <div className="flex items-center gap-x-1">
                        <FaSquare className="text-gray-300" />
                        <p className="text-sm md:text-base">
                          {drawPercentage}%
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <div className="flex items-center gap-x-1">
                        <FaSquareMinus className="text-red-500" />
                        <p className="text-sm md:text-base">
                          {lossPercentage}%
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="w-full h-4 rounded-full flex items-center rounded">
                        <div
                          style={{ width: `${winPercentage}%` }}
                          className="bg-teal-500 h-full"
                        />
                        <div
                          style={{ width: `${drawPercentage}%` }}
                          className="bg-gray-300 h-full"
                        />
                        <div
                          style={{ width: `${lossPercentage}%` }}
                          className="bg-red-500 h-full"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export type PlayerInsightsOpeningsProperties = {
  insights?: Insights;
};

export const PlayerInsightsOpenings: React.FC<
  PlayerInsightsOpeningsProperties
> = ({ insights = {} as Insights }) => {
  const whiteOpenings = insights?.openings?.white ?? [];
  const blackOpenings = insights?.openings?.black ?? [];

  const [side, setSide] = useState('white');

  return (
    <>
      <div id="openings" className="text-center flex flex-col gap-y-2">
        <SectionHeading>
          <div className="flex items-center justify-center gap-x-2">
            <FaBook className="text-teal-500" /> Openings
          </div>
        </SectionHeading>
        <p className="text-xs md:text-sm lg:text-base">
          How well do you play your openings?
        </p>
      </div>
      <div className="card border border-gray-300 shadow">
        <div className="py-4 px-8 border-b">
          <div className="flex items-center justify-between">
            <CardHeading>Performance</CardHeading>
            <div className="join">
              <button
                type="button"
                className={`btn btn-accent join-item ${
                  side === 'white' ? 'btn-solid text-white' : 'btn-outline'
                }`}
                onClick={() => setSide('white')}>
                White
              </button>
              <button
                type="button"
                className={`btn btn-accent join-item ${
                  side === 'black' ? 'btn-solid text-white' : 'btn-outline'
                }`}
                onClick={() => setSide('black')}>
                Black
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="text-base md:text-lg font-bold">
            How well you perform in your 10 most played openings
          </p>
          <div
            id="white"
            className={`${side === 'white' ? 'block' : 'hidden'}`}>
            <PlayerInsightsOpeningsBySide openings={whiteOpenings} />
          </div>
          <div
            id="black"
            className={`${side === 'black' ? 'block' : 'hidden'}`}>
            <PlayerInsightsOpeningsBySide openings={blackOpenings} />
          </div>
        </div>
      </div>
      {/* <div className="card border border-gray-300 shadow">
        <div className="py-4 px-8 border-b">
          <CardHeading>Mastery</CardHeading>
        </div>
        <div className="card-body" />
      </div> */}
    </>
  );
};

PlayerInsightsOpenings.displayName = 'PlayerInsightsOpenings';
