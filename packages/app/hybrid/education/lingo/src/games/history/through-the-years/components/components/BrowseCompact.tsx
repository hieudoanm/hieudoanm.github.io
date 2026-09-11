import { FC } from 'react';
import type { HistoricalEvent } from '../../types';
import { formatYear, groupByCentury } from '../../engine';

interface BrowseCompactProps {
  events: HistoricalEvent[];
  selectedId: string | null;
  onSelect: (event: HistoricalEvent) => void;
}

export const BrowseCompact: FC<BrowseCompactProps> = ({
  events,
  selectedId,
  onSelect,
}) => {
  const groups = groupByCentury(events);

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-y-auto">
      {groups.map((group) => (
        <section key={group.key}>
          <header className="border-base-300 flex items-baseline justify-between border-b pb-1">
            <h2 className="text-sm font-semibold tracking-tight">
              {group.label}
            </h2>
            <span className="text-base-content/40 text-[10px]">
              {group.events.length} events
            </span>
          </header>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {group.events.map((event) => {
              const selected = selectedId === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => onSelect(event)}
                  className={`border-base-300 bg-base-200 hover:border-primary flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selected
                      ? 'border-primary bg-primary text-primary-content'
                      : ''
                  }`}>
                  <span className="font-mono text-[10px] tabular-nums">
                    {formatYear(event.year)}
                  </span>
                  <span className="max-w-40 truncate">{event.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

BrowseCompact.displayName = 'BrowseCompact';
