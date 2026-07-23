'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { FlagGuesser } from '@hieudoanm.github.io/components/pages/games/countries/FlagGuesser';

const GamesCountriesFlagGuesser = () => {
  return <ToolPage Component={FlagGuesser} backPath="/games/countries" />;
};
export default GamesCountriesFlagGuesser;
