'use client';

import { ChessPlayer, ChessStats } from '@prisma/client';
import { CountryCharts } from './components/CountryCharts';
import { CountryHeader } from './components/CountryHeader';
import { CountryPlayers } from './components/CountryPlayers';
import { CountryStats, Stats } from './components/CountryStats';
import { CountryTitles, TitleTotal } from './components/CountryTitles';

type CountryTemplateProperties = {
  countryCode: string;
  stats: Stats;
  total: number;
  titles: TitleTotal[];
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const CountryTemplate: React.FC<CountryTemplateProperties> = ({
  countryCode = '',
  stats,
  total = 0,
  titles = [],
  players = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <CountryHeader countryCode={countryCode} />
      <CountryStats stats={stats} />
      <CountryCharts players={players} />
      <CountryTitles titles={titles} />
      <CountryPlayers total={total} players={players} />
    </div>
  );
};
