'use client';

import {
  Button,
  Card,
  CardHeader,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { TwitchButton } from '@chess/components/atoms/TwitchButton';
import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PlayersTemplateProperties = {
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
};

export const PlayersTemplate: React.FC<PlayersTemplateProperties> = ({
  players = [],
}) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParameters = useSearchParams();
  const isStreamer: boolean = searchParameters.get('isStreamer') === 'true';

  return (
    <Card className="overflow-hidden rounded border border-gray-200 shadow">
      <CardHeader className="border-b">
        <Heading className="text-xl">Players ({players.length})</Heading>
      </CardHeader>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th isNumeric className="w-8">
                Rating
              </Th>
              <Th isNumeric className="w-8">
                Best
              </Th>
              <Th isNumeric className="w-8">
                <Button
                  type="button"
                  size="xs"
                  colorScheme="teal"
                  variant={isStreamer ? 'solid' : 'outline'}
                  onClick={() => {
                    const newSearchParameters = new URLSearchParams(
                      searchParameters
                    );
                    newSearchParameters.set(
                      'isStreamer',
                      (!isStreamer).toString()
                    );
                    const href: string = `${pathname}?${newSearchParameters.toString()}`;
                    router.push(href);
                  }}>
                  Twitch
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {players.map(
              ({
                last = 0,
                best = 0,
                player: {
                  title,
                  id = '',
                  username = '',
                  avatar = '',
                  country,
                  twitchUrl,
                },
              }) => {
                return (
                  <Tr key={id}>
                    <Td>
                      <div className="inline-flex items-center gap-x-2">
                        <div className="h-10 w-10 overflow-hidden rounded border">
                          {avatar.length > 0 ? (
                            <Image
                              src={avatar}
                              alt={username}
                              title={username}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <TitleBadge title={title} />
                        <Link href={`/players/${encodeURIComponent(username)}`}>
                          {username}
                        </Link>{' '}
                        <Link href={`/countries/${country.cca2}`}>
                          {country?.flag ?? ''}
                        </Link>
                      </div>
                    </Td>
                    <Td isNumeric>{last}</Td>
                    <Td isNumeric>{best}</Td>
                    <Td isNumeric>
                      <TwitchButton href={twitchUrl} />
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

PlayersTemplate.displayName = 'PlayersTemplate';
