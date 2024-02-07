'use client';

import { ChessTitleAbbreviation } from '@prisma/client';

type TitleBadgeProperties = { title: ChessTitleAbbreviation | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <div className="text-white bg-red-500 w-12 text-sm h-6 leading-6 text-center rounded">
      {title}
    </div>
  );
};

TitleBadge.displayName = 'TitleBadge';
