'use client';

import {
  eventTypeLabel,
  eventStage,
  eventTime,
  isFailureEvent,
} from '@/lib/contract/schema';
import type { PipelineEvent } from '@/lib/contract/types';

const ROW_LIMIT = 400;

/**
 * The event stream is the pipeline's own log, so it is shown verbatim: type,
 * stage, time. Nothing here interprets a stage or claims progress is healthy.
 */
export const EventTimeline = ({ events }: { events: PipelineEvent[] }) => {
  const visible = events.slice(-ROW_LIMIT);
  if (visible.length === 0) {
    return (
      <p className="text-base-content/70 text-sm">This run wrote no events.</p>
    );
  }
  return (
    <div className="max-h-96 overflow-y-auto">
      <ol className="space-y-1 font-mono text-xs">
        {visible.map((event, index) => (
          <li
            key={`${eventTime(event)}-${index}`}
            className={`flex gap-3 rounded px-2 py-1 ${isFailureEvent(event) ? 'bg-error/10' : ''}`}>
            <span className="text-base-content/60 w-40 shrink-0">
              {eventTime(event)}
            </span>
            <span className="w-44 shrink-0">
              {eventTypeLabel(String(event.type))}
            </span>
            <span className="text-base-content/70 w-32 shrink-0">
              {eventStage(event)}
            </span>
            <span className="truncate">{describe(event)}</span>
          </li>
        ))}
      </ol>
      {events.length > visible.length && (
        <p className="text-base-content/60 mt-2 text-xs">
          Showing the last {visible.length} of {events.length} events.
        </p>
      )}
    </div>
  );
};

const describe = (event: PipelineEvent): string => {
  const record = event as Record<string, unknown>;
  if (event.type === 'error') return String(record.error ?? '');
  if (event.type === 'metric') return `${record.name} = ${record.value}`;
  if (event.type === 'progress') {
    return [
      record.epoch === undefined ? null : `epoch ${String(record.epoch)}`,
      record.loss === undefined ? null : `loss ${String(record.loss)}`,
      record.fold === undefined ? null : `fold ${String(record.fold)}`,
      record.seed === undefined ? null : `seed ${String(record.seed)}`,
    ]
      .filter(Boolean)
      .join(' · ');
  }
  if (event.type === 'stage_end') return String(record.status ?? '');
  return Object.entries(record)
    .filter(([key]) => key !== 'type' && key !== 'stage' && key !== 'timestamp')
    .map(([key, value]) => `${key} ${String(value)}`)
    .join(' ');
};
