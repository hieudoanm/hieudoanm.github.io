import {
  Box,
  Card,
  CardHeader,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { TwitchButton } from '@chess/components/atoms/TwitchButton';
import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export type Streamer = ChessPlayer & {
  country: ChessCountry;
  stats: ChessStats[];
};

type StreamersTemplateProperties = {
  total: number;
  streamers: Streamer[];
};

export const StreamersTemplate: React.FC<StreamersTemplateProperties> = ({
  total = 0,
  streamers = [],
}) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="gap-x-4 md:gap-x-8">
          <Heading className="text-xl">Streamers ({total})</Heading>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className="gap-x-2 md:gap-x-4">
            {/* <Select
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={title}>
                    <option value="GM">GM</option>
                    <option value="IM">IM</option>
                    <option value="FM">FM</option>
                    <option value="CM">CM</option>
                    <option value="NM">NM</option>
                    <option value="WGM">WGM</option>
                    <option value="WIM">WIM</option>
                    <option value="WFM">WFM</option>
                    <option value="WCM">WCM</option>
                    <option value="WNM">WNM</option>
                  </Select>
                  <Select
                    id="country"
                    name="country"
                    placeholder={`Country (${countries.length})`}
                    value={country}>
                    {countries.map(({ countryCode, country }) => {
                      return (
                        <option key={countryCode} value={countryCode}>
                          {country}
                        </option>
                      );
                    })}
                  </Select> */}
          </Box>
        </Box>
      </CardHeader>
      <Divider />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th className="w-4">Title</Th>
              <Th>Username</Th>
              <Th isNumeric className="w-4">
                Country
              </Th>
              <Th isNumeric className="w-4">
                Followers
              </Th>
              <Th isNumeric className="w-4">
                Twitch
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {streamers.map(
              ({
                title,
                username = '',
                avatar = '',
                followers = 0,
                country,
                countryCode = '',
                twitchUrl = '',
              }) => {
                return (
                  <Tr key={username}>
                    <Td>
                      <TitleBadge title={title} />
                    </Td>
                    <Td>
                      <Link href={`/players/${encodeURIComponent(username)}`}>
                        <div className="inline-flex items-center gap-x-2">
                          <div className="h-12 w-12 overflow-hidden rounded border">
                            {avatar.length > 0 ? (
                              <Image
                                src={avatar}
                                alt={username}
                                title={username}
                                width={48}
                                height={48}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <Text>{username}</Text>
                        </div>
                      </Link>
                    </Td>
                    <Td isNumeric>
                      <Link href={`/countries/${countryCode}`}>
                        {country.name}
                      </Link>
                    </Td>
                    <Td isNumeric>{followers.toLocaleString()}</Td>
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
