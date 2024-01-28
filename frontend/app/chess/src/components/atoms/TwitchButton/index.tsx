'use client';

import { Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FaTwitch } from 'react-icons/fa';

type TwitchButtonProperties = { href: string };

export const TwitchButton: React.FC<TwitchButtonProperties> = ({ href }) => {
  return (
    <Link href={href} target="_blank">
      <Button colorScheme="teal" type="button">
        <Icon as={FaTwitch} />
      </Button>
    </Link>
  );
};

TwitchButton.displayName = 'TwitchButton';
