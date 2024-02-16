'use client';

import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { TitleBadge } from '@chess/shared/components/TitleBadge';
import {
  ChessTimeClass,
  ChessTitleAbbreviation,
  ChessVariant,
} from '@prisma/client';
import Link from 'next/link';
import { ChangeEvent } from 'react';

export type PlayerInsightsHeaderProperties = {
  name?: string;
  avatar?: string;
  username?: string;
  title?: ChessTitleAbbreviation;
};

export const PlayerInsightsHeader: React.FC<PlayerInsightsHeaderProperties> = ({
  name = '',
  title = '' as ChessTitleAbbreviation,
  avatar = '',
  username = '',
}) => {
  const [timeClass, setTimeClass] = useSearchParameter(
    'timeClass',
    ChessTimeClass.blitz
  );
  const [variant, setVariant] = useSearchParameter(
    'variant',
    ChessVariant.chess
  );

  return (
    <header className="flex items-center justify-between gap-x-2">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <div
          className="aspect-square w-16 rounded-xl border bg-contain bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div>
          <div className="flex items-center gap-x-2">
            <TitleBadge title={title} />
            <div>
              <Link
                href={`https://www.chess.com/member/${username}`}
                target="_blank"
                className="text-lg uppercase md:text-xl">
                {username}
              </Link>
            </div>
          </div>
          <p className="truncate">{name}</p>
        </div>
      </div>
      <div className="join shadow">
        <select
          id="timeClass"
          name="timeClass"
          className="select select-bordered join-item w-full"
          value={timeClass}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const newTimeClass: string = event.target.value;
            setTimeClass(newTimeClass);
          }}>
          <option value={ChessTimeClass.daily}>Daily</option>
          <option value={ChessTimeClass.rapid}>Rapid</option>
          <option value={ChessTimeClass.blitz}>Blitz</option>
          <option value={ChessTimeClass.bullet}>Bullet</option>
        </select>
        <select
          id="variant"
          name="variant"
          className="select select-bordered join-item w-full"
          value={variant}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const newVariant: string = event.target.value;
            setVariant(newVariant);
          }}>
          <option value={ChessVariant.chess}>Chess</option>
          <option value={ChessVariant.chess960}>Chess960</option>
        </select>
      </div>
    </header>
  );
};

PlayerInsightsHeader.displayName = 'PlayerInsightsHeader';
