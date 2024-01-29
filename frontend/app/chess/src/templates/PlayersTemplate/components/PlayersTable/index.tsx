import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FullChessPlayer } from '@chess/app/api/chess/players/service';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { TwitchButton } from '@chess/common/components/TwitchButton';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { ChessStats, ChessTimeClass } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const getStats = (chessStats: ChessStats[] = []) => {
  return (chessTimeClass: ChessTimeClass) => {
    const stats = (chessStats ?? []).find(
      ({ timeClass }) => timeClass === chessTimeClass
    );
    return {
      best: stats?.best ?? 0,
      last: stats?.last ?? 0,
      win: stats?.win ?? 0,
      draw: stats?.draw ?? 0,
      loss: stats?.loss ?? 0,
    };
  };
};

export type PlayersTableProperties = {
  total: number;
  players: FullChessPlayer[];
};

export const PlayersTable: React.FC<PlayersTableProperties> = ({
  total = 0,
  players = [],
}) => {
  const [isStreamer, setIsStreamer] = useSearchParameter('isStreamer');
  const isStreamerFlag = isStreamer === 'true';

  return (
    <>
      <Heading className="text-center text-lg md:text-left md:text-2xl">
        Players ({total})
      </Heading>
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
                      Bullet
                    </Th>
                    <Th isNumeric className="w-8">
                      Blitz
                    </Th>
                    <Th isNumeric className="w-8">
                      Rapid
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
                      title,
                      id = 0,
                      username = '',
                      avatar = '',
                      country,
                      twitchUrl,
                      stats = [],
                    }: FullChessPlayer) => {
                      const getStatsByTimeClass = getStats(stats);
                      const bulletStats = getStatsByTimeClass('bullet');
                      const blitzStats = getStatsByTimeClass('blitz');
                      const rapidStats = getStatsByTimeClass('rapid');

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
                                href={`/players/${encodeURIComponent(
                                  username
                                )}`}>
                                {username}
                              </Link>{' '}
                              <Link href={`/countries/${country.cca2}`}>
                                {country?.flag ?? ''}
                              </Link>
                            </div>
                          </Td>
                          <Td isNumeric>{bulletStats.last}</Td>
                          <Td isNumeric>{blitzStats.last}</Td>
                          <Td isNumeric>{rapidStats.last}</Td>
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
    </>
  );
};
