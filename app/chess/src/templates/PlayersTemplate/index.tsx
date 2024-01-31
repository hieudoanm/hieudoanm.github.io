'use client';

import { Divider } from '@chakra-ui/react';
import { FullChessPlayer } from '@chess/app/api/chess/players/service';
import { CountryTotal } from '@chess/graphql/data/chess.types';
import { ChessCountry, ChessTitle } from '@prisma/client';
import { PlayersTitles, TitleTotal } from './components/PlayersTitles';
import { PlayersCountries } from './components/PlayersCountries';
import { PlayersDistributions } from './components/PlayersDistributions';
import { PlayersHeader } from './components/PlayersHeader';
import { PlayersStats, Stats } from './components/PlayersStats';
import { PlayersTable } from './components/PlayersTable';

type PlayersTemplateProperties = {
  stats: Stats;
  total: number;
  titles: TitleTotal[];
  countries: CountryTotal[];
  players: FullChessPlayer[];
  titleOptions: ChessTitle[];
  countryOptions: ChessCountry[];
};

export const PlayersTemplate: React.FC<PlayersTemplateProperties> = ({
  stats,
  total = 0,
  titles = [],
  players = [],
  countries = [],
  titleOptions = [],
  countryOptions = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <PlayersHeader
        total={total}
        titles={titleOptions}
        countries={countryOptions}
      />
      <PlayersStats players={players} stats={stats} />
      <PlayersDistributions players={players} />
      <PlayersTitles titles={titles} />
      <PlayersCountries countries={countries} />
      <PlayersTable total={total} players={players} />
    </div>
  );
};

PlayersTemplate.displayName = 'PlayersTemplate';
