import { FC } from 'react';
import type { HistoricalEvent } from '../../types';
import { formatYear, getTimelineBounds, getYearDivider } from '../../engine';
import type { TimelineBounds } from '../../engine';

interface BrowseSpreadProps {
  events: HistoricalEvent[];
  selectedId: string | null;
  onSelect: (event: HistoricalEvent) => void;
  bounds?: TimelineBounds;
}

export const BrowseSpread: FC<BrowseSpreadProps> = ({
  events,
  selectedId,
  onSelect,
  bounds: boundsOverride,
}) => {
  const bounds = boundsOverride ?? getTimelineBounds(events);
  const { minYear, maxYear } = bounds;

  const years: number[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {years.map((year) => {
        const divider = getYearDivider(year);
        const yearEvents = events.filter((event) => event.year === year);
        return (
          <div key={year} className="flex flex-col">
            {divider && (
              <div
                className={`flex items-center gap-2 ${
                  divider.kind === 'century' ? 'py-1' : 'py-0.5'
                }`}>
                <div
                  className={`h-px flex-1 ${
                    divider.kind === 'century'
                      ? 'border-base-content/40 border-t-2'
                      : 'border-base-content/20 border-t'
                  }`}
                />
                <span
                  className={`text-[10px] ${
                    divider.kind === 'century'
                      ? 'text-base-content/60'
                      : 'text-base-content/30'
                  }`}>
                  {divider.label}
                </span>
                <div
                  className={`h-px flex-1 ${
                    divider.kind === 'century'
                      ? 'border-base-content/40 border-t-2'
                      : 'border-base-content/20 border-t'
                  }`}
                />
              </div>
            )}
            <div className="border-base-200 grid grid-cols-[3.5rem_1fr] items-center gap-2 border-b py-0.5">
              <span className="text-base-content/40 font-mono text-[10px] tabular-nums">
                {formatYear(year)}
              </span>
              <div className="flex min-h-[1.5rem] min-w-0 flex-wrap items-center gap-1">
                {yearEvents.map((event) => {
                  const selected = selectedId === event.id;
                  return (
                    <button
                      key={event.id}
                      onClick={() => onSelect(event)}
                      className={`rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap transition-colors ${
                        selected
                          ? 'border-primary bg-primary text-primary-content'
                          : 'border-base-300 bg-base-200 hover:border-primary'
                      }`}>
                      {event.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

BrowseSpread.displayName = 'BrowseSpread';
