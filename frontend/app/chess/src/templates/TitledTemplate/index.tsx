'use client';

import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
import { TitledCharts } from './components/TitledCharts';
import { TitledHeader } from './components/TitledHeader';
import { TitledPlayers } from './components/TitledPlayers';

export type FullChessPlayer = ChessPlayer & {
  country: ChessCountry;
  stats: ChessStats[];
};

export type TitledTemplateProperties = {
  total: number;
  players: FullChessPlayer[];
  countries: ChessCountry[];
};

export const TitledTemplate: React.FC<TitledTemplateProperties> = ({
  total = 0,
  players = [],
  countries = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <TitledHeader total={total} countries={countries} />
      <TitledCharts players={players} />
      <TitledPlayers players={players} />
    </div>
  );
};

TitledTemplate.displayName = 'TitledTemplate';
