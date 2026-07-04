import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const DailyWisdom: FC<TemplateProps> = ({ data }) => {
  const wisdom =
    (data.wisdom as string) ?? 'Simplicity is the ultimate sophistication.';
  const author = (data.author as string) ?? 'Leonardo da Vinci';
  const category = (data.category as string) ?? 'Philosophy';
  const date = (data.date as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <p className="badge badge-primary badge-outline mb-6 text-xs">
        {category}
      </p>
      <p className="text-base-content mb-8 max-w-xl text-3xl leading-snug font-bold">
        {wisdom}
      </p>
      <p className="text-secondary mb-2 text-lg font-medium">— {author}</p>
      {date && <p className="text-base-content/50 text-sm">{date}</p>}
    </div>
  );
};
DailyWisdom.displayName = 'DailyWisdom';
