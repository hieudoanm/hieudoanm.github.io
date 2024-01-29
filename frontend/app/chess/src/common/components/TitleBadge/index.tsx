'use client';

import { Badge } from '@chakra-ui/react';
import { ChessTitleAbbreviation } from '@prisma/client';

type TitleBadgeProperties = { title: ChessTitleAbbreviation | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <Badge
      colorScheme="red"
      size="md"
      textAlign="center"
      variant="solid"
      width={10}>
      {title}
    </Badge>
  );
};

TitleBadge.displayName = 'TitleBadge';
