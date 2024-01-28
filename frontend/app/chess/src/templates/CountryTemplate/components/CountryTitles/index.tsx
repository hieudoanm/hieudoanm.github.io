import { Card, CardHeader, Heading, List, ListItem } from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { ChessTitle } from '@prisma/client';
import Link from 'next/link';

export type TitleTotal = { title: ChessTitle; total: number };

export type CountryTitlesProperties = { titles: TitleTotal[] };

export const CountryTitles: React.FC<CountryTitlesProperties> = ({
  titles = [],
}) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Heading className="text-xl">Titles</Heading>
      </CardHeader>
      <List>
        {titles.map(({ title, total }) => {
          return (
            <ListItem key={title} className="border-t px-4 py-2">
              <div className="flex items-center justify-between">
                <Link href={`/titled/${title}`}>
                  <div className="inline-flex items-center gap-x-2">
                    <TitleBadge title={title} />
                    <p>{TITLED_ABBREVIATIONS[title]}</p>
                  </div>
                </Link>
                <p>{total}</p>
              </div>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
