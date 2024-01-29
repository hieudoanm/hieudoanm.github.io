'use client';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';

export type CountriesHeaderProperties = {
  total: number;
};

export const CountriesHeader: React.FC<CountriesHeaderProperties> = ({
  total,
}) => {
  const [view, setView] = useSearchParameter('view');

  return (
    <div className="flex items-center justify-between">
      <Heading>Countries ({total})</Heading>
      <ButtonGroup isAttached={true}>
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
  );
};
