'use client';

import { DocumentNode, gql } from '@apollo/client';
import { Button, Heading, Icon, Text, useToast } from '@chakra-ui/react';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { ChessTitleAbbreviation } from '@prisma/client';
import Link from 'next/link';
import { FaCheckCircle, FaSync, FaTwitch } from 'react-icons/fa';

type ChessHeaderProperties = {
  avatar: string;
  title: ChessTitleAbbreviation | null;
  name: string;
  username: string;
  verified: boolean;
  is_streamer: boolean;
  twitch_url: string;
};

const mutation: DocumentNode = gql`
  mutation PlayerQuery($username: String!) {
    chess {
      player(username: $username) {
        id
        username
        name
        followers
        avatar
        location
        verified
        lastOnline
        joined
        status
        title
        league
        twitchUrl
        isStreamer
        country
        countryCode
        archives
        stats {
          best
          last
          deviation
          win
          draw
          loss
        }
      }
    }
  }
`;

export const PlayerHeader: React.FC<ChessHeaderProperties> = ({
  title,
  name = '',
  avatar = '',
  username = '',
  verified = false,
  is_streamer = false,
  twitch_url = '',
}) => {
  const toast = useToast();

  const sync = async () => {
    // await apolloClient.mutate({ mutation, variables: { username } });
    toast({
      title: 'Data Synced',
      description: 'Data is synced successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <header className="flex items-center justify-between gap-x-2">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <div
          className="aspect-square w-16 rounded-xl border bg-contain bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div>
          <div className="flex items-center gap-x-2">
            {' '}
            <TitleBadge title={title} />
            <Heading>
              <Link
                href={`https://www.chess.com/member/${username}`}
                target="_blank">
                <Text className="text-lg uppercase md:text-2xl">
                  {username}
                </Text>
              </Link>
            </Heading>
          </div>

          <Text>{name}</Text>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {verified ? <Icon as={FaCheckCircle} color="teal" /> : <></>}
        {is_streamer ? (
          <Link href={twitch_url} target="_blank">
            <Button colorScheme="teal">
              <Icon as={FaTwitch} />
            </Button>
          </Link>
        ) : (
          <></>
        )}
        <Button colorScheme="teal" onClick={sync}>
          <Icon as={FaSync} />
        </Button>
      </div>
    </header>
  );
};

PlayerHeader.displayName = 'PlayerHeader';
