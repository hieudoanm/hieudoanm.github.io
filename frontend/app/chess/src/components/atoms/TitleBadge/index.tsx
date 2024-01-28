import { Badge } from '@chakra-ui/react';
import { ChessTitle } from '@prisma/client';
import Link from 'next/link';

type TitleBadgeProperties = { title: ChessTitle | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <Link href={`/titled/${title}`}>
      <Badge
        backgroundColor="red.500"
        color="white"
        textAlign="center"
        width={10}>
        {title}
      </Badge>
    </Link>
  );
};

TitleBadge.displayName = 'TitleBadge';
