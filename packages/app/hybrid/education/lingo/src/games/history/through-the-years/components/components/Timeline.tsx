import { FC } from 'react';
import type { HistoricalEvent, PlacementResult } from '../../types';
import { formatYear } from '../../engine';

interface TimelineProps {
  events: HistoricalEvent[];
  currentCard: HistoricalEvent | null;
  phase: 'playing' | 'reveal';
  lastResult: PlacementResult | null;
  onPlace: (index: number) => void;
}

export const Timeline: FC<TimelineProps> = ({
  events,
  currentCard,
  phase,
  lastResult,
  onPlace,
}) => {
  const revealIndex = lastResult?.correctIndex ?? -1;

  const renderSlot = (index: number) => {
    if (phase === 'playing' && currentCard) {
      return (
        <button
          onClick={() => onPlace(index)}
          className="border-base-300 text-base-content/30 hover:text-base-content hover:border-base-content/50 flex w-full cursor-pointer items-center justify-center border-2 border-dashed px-3 py-2 text-xs transition-colors">
          Place here
        </button>
      );
    }

    if (phase === 'reveal' && revealIndex === index) {
      return (
        <div className="bg-base-300 border-l-success flex items-center gap-2 border-l-2 px-3 py-2">
          <span className="text-success font-mono text-xs tabular-nums">
            {currentCard ? formatYear(currentCard.year) : ''}
          </span>
          <span className="text-success text-xs font-medium">
            {currentCard?.title}
          </span>
          {lastResult && !lastResult.correct && (
            <span className="badge badge-warning badge-xs ml-auto">
              Correct position
            </span>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-0">
      {renderSlot(0)}
      {events.map((event, i) => (
        <div key={event.id}>
          <div className="border-base-300 bg-base-200 flex items-center gap-3 border-l-2 px-3 py-2.5">
            <span className="text-base-content/40 font-mono text-xs tabular-nums">
              {formatYear(event.year)}
            </span>
            <span className="text-xs font-medium">{event.title}</span>
          </div>
          {renderSlot(i + 1)}
        </div>
      ))}
    </div>
  );
};
