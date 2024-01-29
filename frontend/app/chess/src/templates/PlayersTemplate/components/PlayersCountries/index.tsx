'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
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

  return (
    <>
      <div className="flex justify-end">
        <ButtonGroup isAttached className="inline-flex">
          <Button
            type="button"
            colorScheme="teal"
            variant={view === 'maps' ? 'outline' : 'solid'}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            List
          </Button>
          <Button
            type="button"
            colorScheme="teal"
            variant={view === 'maps' ? 'solid' : 'outline'}
            onClick={() => setView(view === 'maps' ? 'list' : 'maps')}>
            Maps
          </Button>
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
    </>
  );
};

PlayersCountriesMaps.displayName = 'PlayersCountriesMaps';
