import { FC } from 'react';
import type { HistoricalEvent, HintLevel } from '../../types';
import { CATEGORY_COLORS } from '../../data/categories';

interface CardProps {
  event: HistoricalEvent;
  showYear: boolean;
  hintText: string;
  hintLevel: HintLevel;
  onHint: () => void;
}

export const Card: FC<CardProps> = ({
  event,
  showYear,
  hintText,
  hintLevel,
  onHint,
}) => {
  const yearStr = showYear
    ? event.year < 0
      ? `${Math.abs(event.year)} BC`
      : String(event.year)
    : '???';

  return (
    <div className="card border-base-300 bg-base-200 w-full border">
      <div className="card-body gap-2 p-4">
        <div className="flex items-start justify-between">
          <h3 className="card-title text-sm">{event.title}</h3>
          <div className="badge badge-ghost badge-xs">{yearStr}</div>
        </div>

        <p className="text-base-content/70 text-xs leading-relaxed">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`badge badge-xs ${CATEGORY_COLORS[event.category] ?? 'badge-ghost'}`}>
            {event.category}
          </span>
          <span className="text-base-content/40 text-[10px]">
            {'★'.repeat(event.difficulty)}
            {'☆'.repeat(5 - event.difficulty)}
          </span>
        </div>

        {hintLevel > 0 && hintText && (
          <div className="bg-base-300 rounded-box text-base-content/70 px-2 py-1 text-center font-mono text-xs">
            {hintText}
          </div>
        )}

        {!showYear && (
          <button onClick={onHint} className="btn btn-ghost btn-xs mt-1">
            Use Hint
          </button>
        )}
      </div>
    </div>
  );
};
