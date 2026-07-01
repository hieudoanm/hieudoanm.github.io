// tabs/TimeTab.tsx
import { FC } from 'react';

interface Block {
  label: string;
  start: number;
  end: number;
}

const BLOCKS: Block[] = [
  { label: 'Sleep', start: 0, end: 8 },
  { label: 'Breakfast', start: 8, end: 9 },
  { label: 'Morning work', start: 9, end: 12 },
  { label: 'Lunch', start: 12, end: 13 },
  { label: 'Afternoon work', start: 13, end: 18 },
  { label: 'Dinner', start: 18, end: 19 },
  { label: 'Exercise', start: 19, end: 21 },
  { label: 'Relaxation', start: 21, end: 24 },
];

export const TimeTab: FC = () => {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const activeBlock = BLOCKS.find(
    (b) => currentHour >= b.start && currentHour < b.end
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1.5 p-3">
          {BLOCKS.map((block) => {
            const hours = block.end - block.start;
            const isActive = activeBlock?.label === block.label;

            return (
              <div
                key={block.label}
                style={{ height: `${hours * 28}px` }}
                className={`relative flex items-center gap-2 rounded-full border px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-base-content/10 border-base-content/30 shadow-sm'
                    : 'bg-base-content/5 border-base-content/10 opacity-60'
                }`}>
                {/* time range */}
                <span
                  className={`shrink-0 font-mono text-[10px] tabular-nums ${
                    isActive ? 'opacity-80' : 'opacity-50'
                  }`}>
                  {String(block.start).padStart(2, '0')}–
                  {String(block.end).padStart(2, '0')}
                </span>

                {/* label */}
                <span
                  className={`flex-1 text-xs font-normal ${
                    isActive ? 'opacity-100' : 'opacity-60'
                  }`}>
                  {block.label}
                </span>

                {/* hours badge */}
                <span
                  className={`shrink-0 font-mono text-[10px] tabular-nums ${
                    isActive ? 'opacity-60' : 'opacity-30'
                  }`}>
                  {hours}h
                </span>

                {/* active progress bar */}
                {isActive && (
                  <div className="bg-base-content/10 absolute right-2 bottom-1.5 left-2 h-0.5 overflow-hidden rounded-full">
                    <div
                      className="bg-base-content/40 h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(((currentHour - block.start) / hours) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
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
