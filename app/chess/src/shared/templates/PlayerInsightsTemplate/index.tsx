'use client';

import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessTitleAbbreviation } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { FaChessPawn } from 'react-icons/fa';
import {
  FaBook,
  FaCalendarDays,
  FaChessBoard,
  FaCircleUser,
  FaGlobe,
} from 'react-icons/fa6';
import { Link as ScrollLink } from 'react-scroll';
import { PlayerInsightsCalendar } from './components/PlayerInsightsCalendar';
import { PlayerInsightsGames } from './components/PlayerInsightsGames';
import { PlayerInsightsGeography } from './components/PlayerInsightsGeography';
import { PlayerInsightsHeader } from './components/PlayerInsightsHeader';
import { PlayerInsightsMoves } from './components/PlayerInsightsMoves';
import { PlayerInsightsOpenings } from './components/PlayerInsightsOpenings';
import { PlayerInsightsOpponents } from './components/PlayerInsightsOpponents';

export type PlayerInsightsTemplateProperties = {
  mobile?: boolean;
  name?: string;
  avatar?: string;
  username?: string;
  title?: ChessTitleAbbreviation;
  insights?: Insights;
};

export const PlayerInsightsTemplate: React.FC<
  PlayerInsightsTemplateProperties
> = ({
  mobile = false,
  name = '',
  username = '',
  avatar = '',
  title = '' as ChessTitleAbbreviation,
  insights = {} as Insights,
}) => {
  const [timeClass] = useSearchParameter('timeClass', 'blitz');
  const [top, setTop] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(() => {
    const scrollY: number = window.scrollY;
    const top = scrollY > 60 ? scrollY - 60 : scrollY;
    console.log('top', top);
    setTop(top);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="grid h-full grid-cols-1 gap-0 overflow-hidden py-8 md:grid-cols-4 md:gap-x-8">
      <div className="order-2 col-span-1 md:order-1 md:col-span-3">
        <div className="flex flex-col gap-y-8">
          <PlayerInsightsHeader
            name={name}
            title={title}
            avatar={avatar}
            username={username}
          />
          <PlayerInsightsGames insights={insights} />
          <PlayerInsightsOpenings insights={insights} />
          <PlayerInsightsMoves insights={insights} />
          <PlayerInsightsCalendar insights={insights} />
          <PlayerInsightsGeography insights={insights} />
          <PlayerInsightsOpponents insights={insights} />
        </div>
      </div>
      <div className="order-1 col-span-1 md:order-2">
        <div className="relative hidden md:block">
          <div
            style={{ top: `${top}px` }}
            className="absolute left-0 right-0 w-full transition-all duration-0 ease-linear">
            <div className="card border shadow">
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="uppercase">{username}</div>
                  <div className="font-semibold capitalize">{timeClass}</div>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaChessBoard className="text-teal-500" />
                  <ScrollLink
                    to="games"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Games
                  </ScrollLink>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaBook className="text-teal-500" />
                  <ScrollLink
                    to="openings"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Openings
                  </ScrollLink>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaChessPawn className="text-teal-500" />
                  <ScrollLink
                    to="moves"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Moves
                  </ScrollLink>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaCalendarDays className="text-teal-500" />
                  <ScrollLink
                    to="calendar"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Calendar
                  </ScrollLink>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaGlobe className="text-teal-500" />
                  <ScrollLink
                    to="geography"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Geography
                  </ScrollLink>
                </div>
              </div>
              <div className="border-t px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <FaCircleUser className="text-teal-500" />
                  <ScrollLink
                    to="opponents"
                    className="cursor-pointer"
                    duration={500}
                    offset={-32}
                    smooth
                    spy>
                    Opponents
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerInsightsTemplate.displayName = 'PlayerInsightsTemplate';
