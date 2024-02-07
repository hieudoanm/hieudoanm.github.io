'use client';

import { ChessTitleAbbreviation } from '@prisma/client';

type TitleBadgeProperties = { title: ChessTitleAbbreviation | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <div className="text-white bg-red-500 w-12 text-xs h-4 leading-4 text-center rounded">
      {title}
    </div>
  );
};

TitleBadge.displayName = 'TitleBadge';
