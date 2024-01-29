import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { TwitchButton } from '@chess/common/components/TwitchButton';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export type PlayersTableProperties = {
  total: number;
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
};

export const PlayersTable: React.FC<PlayersTableProperties> = ({
  total = 0,
  players = [],
}) => {
  const [isStreamer, setIsStreamer] = useSearchParameter('isStreamer');
  const isStreamerFlag = isStreamer === 'true';

  return (
    <Accordion allowToggle className="rounded border">
      <AccordionItem className="border-0">
        <AccordionButton className="border-b">
          <div className="flex w-full items-center justify-between">
            <div className="flex-grow text-left">Players ({total})</div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel padding={0}>
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
                      variant={isStreamerFlag ? 'solid' : 'outline'}
                      onClick={() => {
                        setIsStreamer((!isStreamerFlag).toString());
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
                            <Link
                              href={`/players/${encodeURIComponent(username)}`}>
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
