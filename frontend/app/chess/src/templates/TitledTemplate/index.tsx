'use client';

import { TimeRange } from '@chess/common/types/time';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from '@prisma/client';
import { TitledCharts } from './components/TitledCharts';
import { TitledHeader } from './components/TitledHeader';
import { TitledPlayers } from './components/TitledPlayers';
import { Stats, TitledStats } from './components/TitledStats';

export type FullChessPlayer = ChessPlayer & {
  country: ChessCountry;
  stats: ChessStats[];
};

export type TitledTemplateProperties = {
  stats: Stats;
  total: number;
  players: FullChessPlayer[];
};

export const TitledTemplate: React.FC<TitledTemplateProperties> = ({
  total = 0,
  players = [],
  stats,
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <TitledHeader total={total} />
      <TitledStats players={players} stats={stats} />
      <TitledCharts players={players} />
      <TitledPlayers players={players} />
    </div>
  );
};

TitledTemplate.displayName = 'TitledTemplate';
