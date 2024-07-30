import { Title } from '@prisma/client';

type TitleBadgeProperties = { title?: Title | null };

export const TitleBadge: React.FC<TitleBadgeProperties> = ({
  title = 'GM',
}) => {
  if (!title) return <></>;

  return (
    <div className='h-4 w-12 rounded bg-red-500 text-center text-xs leading-4 text-white'>
      {title}
    </div>
  );
};

TitleBadge.displayName = 'TitleBadge';
