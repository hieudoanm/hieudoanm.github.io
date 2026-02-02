import { useWindowSize } from '@web/hooks/window/use-size';
import { FC } from 'react';

export const Weekday: FC = () => {
  const windowSize = useWindowSize();
  const times = windowSize.width < 768 ? 3 : 4;
  const daysPerRow = times * 7;
  const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className="grid grid-rows-1"
      style={{ gridTemplateColumns: `repeat(${daysPerRow}, minmax(0, 1fr))` }}>
      {[
        ...weekday, // Week 1
        ...weekday, // Week 2
        ...weekday, // Week 3
        ...(times === 4 ? weekday : []), // Week 4
      ].map((weekday, index) => (
        <div
          key={`${weekday}-${index}`}
          className="text-base-content col-span-1 text-center text-xs">
          {weekday}
        </div>
      ))}
    </div>
  );
};
