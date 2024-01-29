'use client';

import { Badge } from '@chakra-ui/react';
import { ChessTitleAbbreviation } from '@prisma/client';
import Link from 'next/link';

type TitleBadgeProperties = { title: ChessTitleAbbreviation | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <Link href={`/titled?title=${title}`}>
      <Badge
        colorScheme="red"
        size="md"
        textAlign="center"
        variant="solid"
        width={10}>
        {title}
      </Badge>
    </Link>
  );
};

TitleBadge.displayName = 'TitleBadge';
