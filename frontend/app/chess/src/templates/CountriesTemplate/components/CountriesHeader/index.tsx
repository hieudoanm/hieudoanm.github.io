'use client';

import { Button, ButtonGroup, Heading, Select } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessTitle } from '@prisma/client';

export type CountriesHeaderProperties = {
  total: number;
  titles: ChessTitle[];
};

export const CountriesHeader: React.FC<CountriesHeaderProperties> = ({
  total = 0,
  titles = [],
}) => {
  const [title, setTitle] = useSearchParameter('title');
  const [view, setView] = useSearchParameter('view');

  return (
    <div className="flex items-center justify-between">
      <Heading>Countries ({total})</Heading>
      <div className="flex items-center gap-x-2">
        <Select
          aria-label="Title"
          id="title"
          name="title"
          className="shadow"
          value={title}
          onChange={(event) => {
            const newTitle: string = event.target.value;
            setTitle(newTitle);
          }}>
          <option value="">Title</option>
          {titles.map(({ abbreviation, title }) => (
            <option key={abbreviation} value={abbreviation}>
              {title}
            </option>
          ))}
        </Select>
        <ButtonGroup isAttached className="shadow">
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
    </div>
  );
};
