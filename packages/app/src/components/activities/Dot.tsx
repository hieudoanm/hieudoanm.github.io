import { FC } from 'react';

export type DotProps = {
  index: number;
  date: Date;
};

export const Dot: FC<DotProps> = ({ index, date }) => {
  const today = new Date();

  const toDateString = date.toLocaleString().split(',').at(0);

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const todayTime = today.getTime();
  const toDateTime = date.getTime();
  const isPast = todayTime - toDateTime > 0;
  const isFuture = todayTime - toDateTime < 0;

  if (index === 0) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="bg-base-content/5 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isToday) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="relative w-2">
          <div className="bg-base-content absolute aspect-square w-2 rounded-full" />
          <div className="bg-base-content aspect-square w-2 animate-ping rounded-full" />
        </div>
      </div>
    );
  }

  if (isPast) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="bg-base-content/75 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isFuture) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="border-base-content/50 aspect-square w-2 rounded-full border" />
      </div>
    );
  }

  return <></>;
};
