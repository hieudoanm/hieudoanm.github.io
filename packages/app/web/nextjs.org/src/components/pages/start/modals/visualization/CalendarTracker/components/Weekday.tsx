import { FC } from 'react';

export const Weekday: FC = () => {
  const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const times =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 4;
  const daysPerRow = times * 7;

  return (
    <div
      className="grid grid-rows-1"
      style={{ gridTemplateColumns: `repeat(${daysPerRow}, minmax(0, 1fr))` }}>
      {[
        ...weekday,
        ...weekday,
        ...weekday,
        ...(times === 4 ? weekday : []),
      ].map((day, index) => (
        <div
          key={`${day}-${index}`}
          className="text-base-content col-span-1 text-center text-xs">
          {day}
        </div>
      ))}
    </div>
  );
};
Weekday.displayName = 'Weekday';
