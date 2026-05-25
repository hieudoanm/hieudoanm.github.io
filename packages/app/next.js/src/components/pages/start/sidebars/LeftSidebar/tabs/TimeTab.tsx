// tabs/TimeTab.tsx
import { FC } from 'react';

type Block = {
  label: string;
  start: number;
  end: number;
  colorClass: string;
  glassClass: string;
  borderClass: string;
};

const BLOCKS: Block[] = [
  {
    label: 'Sleep',
    start: 0,
    end: 8,
    colorClass: 'bg-primary',
    glassClass: 'bg-primary/10 backdrop-blur-sm',
    borderClass: 'border border-primary/30',
  },
  {
    label: 'Breakfast',
    start: 8,
    end: 9,
    colorClass: 'bg-warning',
    glassClass: 'bg-warning/10 backdrop-blur-sm',
    borderClass: 'border border-warning/30',
  },
  {
    label: 'Morning work',
    start: 9,
    end: 12,
    colorClass: 'bg-secondary',
    glassClass: 'bg-secondary/10 backdrop-blur-sm',
    borderClass: 'border border-secondary/30',
  },
  {
    label: 'Lunch',
    start: 12,
    end: 13,
    colorClass: 'bg-warning',
    glassClass: 'bg-warning/10 backdrop-blur-sm',
    borderClass: 'border border-warning/30',
  },
  {
    label: 'Afternoon work',
    start: 13,
    end: 18,
    colorClass: 'bg-secondary',
    glassClass: 'bg-secondary/10 backdrop-blur-sm',
    borderClass: 'border border-secondary/30',
  },
  {
    label: 'Dinner',
    start: 18,
    end: 19,
    colorClass: 'bg-warning',
    glassClass: 'bg-warning/10 backdrop-blur-sm',
    borderClass: 'border border-warning/30',
  },
  {
    label: 'Exercise',
    start: 19,
    end: 21,
    colorClass: 'bg-success',
    glassClass: 'bg-success/10 backdrop-blur-sm',
    borderClass: 'border border-success/30',
  },
  {
    label: 'Relaxation',
    start: 21,
    end: 24,
    colorClass: 'bg-accent',
    glassClass: 'bg-accent/10 backdrop-blur-sm',
    borderClass: 'border border-accent/30',
  },
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
                className={`relative flex items-center gap-2 rounded-lg px-3 transition-all duration-300 ${
                  isActive
                    ? `${block.colorClass}/20 ${block.borderClass} shadow-sm`
                    : `${block.glassClass} ${block.borderClass} opacity-50`
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
                  className={`flex-1 text-xs font-medium ${
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
                  <div className="bg-base-content/10 absolute right-2 bottom-1.5 left-2 h-0.5 overflow-hidden rounded-lg">
                    <div
                      className="bg-base-content/40 h-full rounded-lg transition-all duration-1000"
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
