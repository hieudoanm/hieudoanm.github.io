'use client';

import { Divider } from '@chakra-ui/react';
import { CountryTotal } from '@chess/graphql/data/chess.types';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from '@prisma/client';
import { TitleTotal } from './components/PlayerTitles';
import { PlayersTitles } from './components/PlayerTitles';
import { PlayersCountries } from './components/PlayersCountries';
import { PlayersHeader } from './components/PlayersHeader';
import { PlayersTable } from './components/PlayersTable';

type PlayersTemplateProperties = {
  total: number;
  titleOptions: ChessTitle[];
  countryOptions: ChessCountry[];
  titles: TitleTotal[];
  countries: CountryTotal[];
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
};

export const PlayersTemplate: React.FC<PlayersTemplateProperties> = ({
  total = 0,
  titles = [],
  players = [],
  countries = [],
  titleOptions = [],
  countryOptions = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <PlayersHeader titles={titleOptions} countries={countryOptions} />
      <Divider />
      <PlayersTitles titles={titles} />
      <Divider />
      <PlayersCountries countries={countries} />
      <Divider />
      <PlayersTable total={total} players={players} />
    </div>
  );
};

PlayersTemplate.displayName = 'PlayersTemplate';
