import { FC, useMemo } from 'react';

import { TimeBlock } from './TimeBlock';
import { BLOCKS } from './constants';

export const TimeTab: FC = () => {
  const now = useMemo(() => new Date(), []);
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const activeBlock = BLOCKS.find(
    (b) => currentHour >= b.start && currentHour < b.end
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1.5 p-3">
          {BLOCKS.map((block) => (
            <TimeBlock
              key={block.label}
              block={block}
              currentHour={currentHour}
              isActive={activeBlock?.label === block.label}
            />
          ))}
        </div>
      </div>

      <footer className="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {activeBlock?.label ?? 'off schedule'} ·{' '}
          {String(now.getHours()).padStart(2, '0')}:
          {String(now.getMinutes()).padStart(2, '0')}
        </p>
      </footer>
    </div>
  );
};
TimeTab.displayName = 'TimeTab';
