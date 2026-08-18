'use client';

import { formatEventMinute, MatchEvent, MatchEventType } from '@/lib/match';
import { FC } from 'react';
import {
  FiAlertTriangle,
  FiClock,
  FiMinus,
  FiPlus,
  FiRepeat,
} from 'react-icons/fi';

interface EventLogProps {
  events: MatchEvent[];
  addedTime: number;
  substitutions: number;
  substitutionsRemaining: number;
  onAddCard: (kind: 'yellow' | 'red') => void;
  onSetAddedTime: (minutes: number) => void;
}

const EVENT_LABELS: Record<MatchEventType, string> = {
  goal: 'Goal',
  concede: 'Concede',
  'yellow-card': 'Yellow card',
  'red-card': 'Red card',
  substitution: 'Substitution',
  'half-time-whistle': 'Half-time whistle',
  'full-time-whistle': 'Full-time whistle',
};

export const EventLog: FC<EventLogProps> = ({
  events,
  addedTime,
  substitutions,
  substitutionsRemaining,
  onAddCard,
  onSetAddedTime,
}) => {
  const noSubsLeft = substitutionsRemaining === 0;

  return (
    <div className="rounded-box flex flex-col gap-2 border border-white/10 p-2">
      <div className="flex items-center justify-between">
        <span className="text-base-content/50 flex items-center gap-1 text-xs font-bold uppercase">
          <FiClock className="size-3" />
          Match events
        </span>
        <span
          aria-label="Substitutions used"
          className="text-base-content/60 text-xs font-bold tabular-nums">
          Subs {substitutions}/{5}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base-content/50 text-xs">Added time</span>
          <button
            type="button"
            aria-label="Decrease added time"
            onClick={() => onSetAddedTime(addedTime - 1)}
            className="btn btn-ghost btn-xs">
            <FiMinus className="size-3" />
          </button>
          <span
            aria-label="Added time"
            className="font-mono text-sm font-bold tabular-nums">
            {addedTime} min
          </span>
          <button
            type="button"
            aria-label="Increase added time"
            onClick={() => onSetAddedTime(addedTime + 1)}
            className="btn btn-ghost btn-xs">
            <FiPlus className="size-3" />
          </button>
        </div>
        <button
          type="button"
          aria-label="Record yellow card"
          onClick={() => onAddCard('yellow')}
          className="btn btn-outline btn-xs">
          Yellow
        </button>
        <button
          type="button"
          aria-label="Record red card"
          onClick={() => onAddCard('red')}
          className="btn btn-outline btn-error btn-xs">
          Red
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-base-content/50 flex items-center gap-1 text-xs">
          <FiRepeat className="size-3" />
          Substitutions
        </span>
        {noSubsLeft ? (
          <span className="text-error flex items-center gap-1 text-xs font-bold">
            <FiAlertTriangle className="size-3" />
            No substitutions left
          </span>
        ) : substitutionsRemaining === 1 ? (
          <span className="text-warning text-xs font-bold">
            1 substitution left
          </span>
        ) : null}
      </div>

      {events.length === 0 ? (
        <p className="text-base-content/40 text-xs">
          No events yet. Goals, cards, and substitutions will appear here.
        </p>
      ) : (
        <ul
          data-testid="match-events"
          className="flex max-h-48 list-none flex-col gap-1 overflow-y-auto">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center gap-2 rounded border border-white/5 px-2 py-1">
              <span className="text-base-content/50 font-mono text-[10px] font-bold tabular-nums">
                {formatEventMinute(event.minute, event.added)}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs">
                {EVENT_LABELS[event.type]}
              </span>
              {event.playerName && (
                <span className="text-base-content/50 text-[10px]">
                  {event.playerName}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

EventLog.displayName = 'EventLog';
