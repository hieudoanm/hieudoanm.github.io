'use client';

import { ChessTitleAbbreviation } from '@prisma/client';

type TitleBadgeProperties = { title: ChessTitleAbbreviation | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <div className="badge badge-md bg-red-500 w-8 text-center">{title}</div>
  );
};

TitleBadge.displayName = 'TitleBadge';
