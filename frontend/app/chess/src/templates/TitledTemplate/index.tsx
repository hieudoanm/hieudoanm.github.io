'use client';

import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
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
  countries: ChessCountry[];
};

export const TitledTemplate: React.FC<TitledTemplateProperties> = ({
  stats,
  total = 0,
  players = [],
  countries = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <TitledHeader total={total} countries={countries} />
      <TitledStats players={players} stats={stats} />
      <TitledCharts players={players} />
      <TitledPlayers players={players} />
    </div>
  );
};

TitledTemplate.displayName = 'TitledTemplate';
