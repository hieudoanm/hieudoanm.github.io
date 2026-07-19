import { FC } from 'react';
import type { HistoricalEvent, PlacementResult } from '../types';
import { formatYear } from '../engine';

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

  return (
    <div className="flex flex-col gap-0">
      {events.map((event, i) => (
        <div key={event.id}>
          <div className="border-base-300 bg-base-200 flex items-center gap-3 border-l-2 px-3 py-2.5">
            <span className="text-base-content/40 font-mono text-xs tabular-nums">
              {formatYear(event.year)}
            </span>
            <span className="text-xs font-medium">{event.title}</span>
          </div>

          {phase === 'playing' && currentCard && (
            <button
              onClick={() => onPlace(i)}
              className="border-base-300 text-base-content/30 hover:text-base-content hover:border-base-content/50 flex w-full items-center justify-center border-2 border-dashed px-3 py-2 text-xs transition-colors">
              Place here
            </button>
          )}

          {phase === 'reveal' && revealIndex === i && (
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
          )}

          {phase === 'reveal' &&
            lastResult &&
            !lastResult.correct &&
            revealIndex === i + 1 &&
            i === events.length - 1 && (
              <div className="bg-base-300 border-l-success flex items-center gap-2 border-l-2 px-3 py-2">
                <span className="text-success font-mono text-xs tabular-nums">
                  {formatYear(currentCard!.year)}
                </span>
                <span className="text-success text-xs font-medium">
                  {currentCard?.title}
                </span>
                <span className="badge badge-warning badge-xs ml-auto">
                  Correct position
                </span>
              </div>
            )}
        </div>
      ))}

      {phase === 'playing' && currentCard && (
        <button
          onClick={() => onPlace(events.length)}
          className="border-base-300 text-base-content/30 hover:text-base-content hover:border-base-content/50 flex w-full items-center justify-center border-2 border-dashed px-3 py-2 text-xs transition-colors">
          Place here
        </button>
      )}

      {phase === 'reveal' && revealIndex === events.length && (
        <div className="bg-base-300 border-l-success flex items-center gap-2 border-l-2 px-3 py-2">
          <span className="text-success font-mono text-xs tabular-nums">
            {currentCard ? formatYear(currentCard.year) : ''}
          </span>
          <span className="text-success text-xs font-medium">
            {currentCard?.title}
          </span>
        </div>
      )}
    </div>
  );
};
