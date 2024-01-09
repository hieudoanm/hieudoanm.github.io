import { DocumentNode, gql } from '@apollo/client';
import { Badge, Button, Heading, Icon, Text, useToast } from '@chakra-ui/react';
import { apolloClient } from '@chess/common/graphql';
import Link from 'next/link';
import { FaCheckCircle, FaSync, FaTwitch } from 'react-icons/fa';

type ChessHeaderProperties = {
  avatar: string;
  title: string;
  name: string;
  username: string;
  verified: boolean;
  is_streamer: boolean;
  twitch_url: string;
};

const mutation: DocumentNode = gql`
  mutation PlayerQuery($username: String!) {
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
      statsDailyRatingBest
      statsDailyRatingLast
      statsDailyRatingDeviation
      statsDailyRecordWin
      statsDailyRecordDraw
      statsDailyRecordLoss
      statsRapidRatingBest
      statsRapidRatingLast
      statsRapidRatingDeviation
      statsRapidRecordWin
      statsRapidRecordDraw
      statsRapidRecordLoss
      statsBlitzRatingBest
      statsBlitzRatingLast
      statsBlitzRatingDeviation
      statsBlitzRecordWin
      statsBlitzRecordDraw
      statsBlitzRecordLoss
      statsBulletRatingBest
      statsBulletRatingLast
      statsBulletRatingDeviation
      statsBulletRecordWin
      statsBulletRecordDraw
      statsBulletRecordLoss
      archives
    }
  }
`;

export const ChessHeader: React.FC<ChessHeaderProperties> = ({
  avatar = '',
  title = '',
  name = '',
  username = '',
  verified = false,
  is_streamer = false,
  twitch_url = '',
}) => {
  const toast = useToast();

  const sync = async () => {
    await apolloClient.mutate({ mutation, variables: { username } });
    toast({
      title: 'Data Synced',
      description: 'Data is synced successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <div
          className="aspect-square w-16 rounded-xl bg-contain bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div>
          <Heading className="flex items-center gap-x-2">
            {title ? (
              <Badge className="rounded bg-red-500 px-2 py-1 text-white">
                {title}
              </Badge>
            ) : (
              <></>
            )}
            <Link
              href={`https://www.chess.com/member/${username}`}
              target="_blank"
            >
              <Text className="text-lg uppercase md:text-2xl">{username}</Text>
            </Link>
          </Heading>
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
    </div>
  );
};
