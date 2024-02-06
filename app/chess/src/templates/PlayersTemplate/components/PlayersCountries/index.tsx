'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ButtonGroup,
} from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { CountryTotal, PlayersCountriesList } from '../PlayersCountriesList';
import { PlayersCountriesMaps } from '../PlayersCountriesMaps';

export type PlayersCountriesProperties = {
  countries: CountryTotal[];
};

export const PlayersCountries: React.FC<PlayersCountriesProperties> = ({
  countries = [],
}) => {
  const [view, setView] = useSearchParameter('view');

  const total: number = countries.reduce(
    (previousValue: number, { total }) => previousValue + total,
    0
  );

  if (countries.length === 0) return <></>;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-center text-lg md:text-left md:text-2xl">
          Countries ({countries.length})
        </h1>
        <ButtonGroup isAttached className="inline-flex">
          <button
            type="button"
            className="bg-teal-500 text-white btn"
            // variant={view === 'maps' ? 'outline' : 'solid'}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            List
          </button>
          <button
            type="button"
            className="bg-teal-500 text-white btn"
            // variant={view === 'maps' ? 'solid' : 'outline'}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            Maps
          </button>
        </ButtonGroup>
      </div>
      <Accordion allowToggle className="rounded border">
        <AccordionItem className="border-0">
          <AccordionButton className="border-b">
            <div className="flex w-full items-center justify-between">
              <div className="flex-grow text-left">Countries ({total}) </div>
              <AccordionIcon />
            </div>
          </AccordionButton>
          <AccordionPanel padding={0}>
            {view === 'maps' ? (
              <PlayersCountriesMaps countries={countries} />
            ) : (
              <PlayersCountriesList countries={countries} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <div className="divider" />
    </>
  );
};

PlayersCountriesMaps.displayName = 'PlayersCountriesMaps';
