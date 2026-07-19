import { FC, useState } from 'react';
import { CATEGORY_COLORS } from '../../data/categories';
import { EVENT_SETS } from '../../data/constants';
import type { DeckInfo } from '../../data/decks';
import { DECKS, getDeckOptionGroups } from '../../data/decks';
import { formatYear, getTimelineBounds, sortByYear } from '../../engine';
import type { TimelineBounds } from '../../engine';
import { useGameStore } from '../../store';
import type { DeckId, HistoricalEvent } from '../../types';
import { BrowseCompact } from '../components/BrowseCompact';
import { BrowseSpread } from '../components/BrowseSpread';

type ViewMode = 'compact' | 'spread';

interface BrowseColumnProps {
  deck: DeckInfo;
  events: HistoricalEvent[];
  view: ViewMode;
  selectedId: string | null;
  onSelect: (event: HistoricalEvent) => void;
  bounds?: TimelineBounds;
}

const BrowseColumn: FC<BrowseColumnProps> = ({
  deck,
  events,
  view,
  selectedId,
  onSelect,
  bounds,
}) => (
  <div className="min-w-0 flex-1">
    <header className="border-base-300 mb-2 flex items-baseline justify-between gap-2 border-b py-1">
      <span className="text-xs font-semibold">{deck.label}</span>
      <span className="text-base-content/50 text-[10px]">
        {events.length} events · {formatYear(events.at(0)?.year ?? 0)} –{' '}
        {formatYear(events.at(-1)?.year ?? 0)}
      </span>
    </header>
    {view === 'compact' ? (
      <BrowseCompact
        events={events}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    ) : (
      <BrowseSpread
        events={events}
        selectedId={selectedId}
        onSelect={onSelect}
        bounds={bounds}
      />
    )}
  </div>
);

interface BrowseBodyProps {
  deck: DeckInfo;
  events: HistoricalEvent[];
  compareDeck: DeckInfo | null;
  compareEvents: HistoricalEvent[];
  view: ViewMode;
  selectedId: string | null;
  onSelect: (event: HistoricalEvent) => void;
  bounds?: TimelineBounds;
}

const BrowseBody: FC<BrowseBodyProps> = ({
  deck,
  events,
  compareDeck,
  compareEvents,
  view,
  selectedId,
  onSelect,
  bounds,
}) => {
  if (compareDeck) {
    return (
      <div className="overflow-x-auto">
        <div className="flex min-w-[48rem] items-start">
          <BrowseColumn
            deck={deck}
            events={events}
            view={view}
            selectedId={selectedId}
            onSelect={onSelect}
            bounds={bounds}
          />
          <div className="border-base-300 mx-3 w-px self-stretch bg-current opacity-20" />
          <BrowseColumn
            deck={compareDeck}
            events={compareEvents}
            view={view}
            selectedId={selectedId}
            onSelect={onSelect}
            bounds={bounds}
          />
        </div>
      </div>
    );
  }

  if (view === 'compact') {
    return (
      <BrowseCompact
        events={events}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    );
  }

  return (
    <BrowseSpread events={events} selectedId={selectedId} onSelect={onSelect} />
  );
};

export const BrowseScreen: FC = () => {
  const deckId = useGameStore((s) => s.deckId);
  const reset = useGameStore((s) => s.reset);
  const [view, setView] = useState<ViewMode>('compact');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compareDeckId, setCompareDeckId] = useState<DeckId | null>(null);

  const deck = DECKS.find((d) => d.id === deckId)!;
  const events = sortByYear(EVENT_SETS[deckId]);
  const deckOptions = getDeckOptionGroups(deckId);
  const compareDeck = compareDeckId
    ? (DECKS.find((d) => d.id === compareDeckId) ?? null)
    : null;
  const compareEvents = compareDeckId
    ? sortByYear(EVENT_SETS[compareDeckId])
    : [];
  const allEvents =
    compareEvents.length > 0 ? [...events, ...compareEvents] : events;
  const selected = allEvents.find((event) => event.id === selectedId) ?? null;
  const compareBounds = compareDeck ? getTimelineBounds(allEvents) : undefined;

  return (
    <div
      className={`mx-auto flex h-full w-full flex-col gap-4 p-4 md:p-8 ${
        compareDeck ? 'max-w-5xl' : 'max-w-md'
      }`}>
      <header className="flex flex-col gap-3">
        <div>
          <button
            onClick={reset}
            className="btn btn-ghost btn-sm p-0"
            aria-label="Back to setup">
            Back
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold tracking-tight">
              {deck.label}
            </h1>
            <p className="text-base-content/50 text-[10px]">
              {events.length} events · {formatYear(events.at(0)?.year ?? 0)} –{' '}
              {formatYear(events.at(-1)?.year ?? 0)}
            </p>
          </div>
          <div className="bg-base-300 rounded-box flex gap-1 p-1">
            <button
              onClick={() => setView('compact')}
              className={`btn btn-xs ${view === 'compact' ? 'btn-primary' : 'btn-ghost'}`}>
              Compact
            </button>
            <button
              onClick={() => setView('spread')}
              className={`btn btn-xs ${view === 'spread' ? 'btn-primary' : 'btn-ghost'}`}>
              Spread
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-2">
        <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
          Compare
        </span>
        <select
          value={compareDeckId ?? ''}
          onChange={(event) => {
            const value = event.target.value as DeckId | '';
            setCompareDeckId(value || null);
          }}
          className="select select-bordered select-sm flex-1"
          aria-label="Compare with another set of events">
          <option value="">Off</option>
          {deckOptions.map((group) => (
            <optgroup key={group.continent} label={group.label}>
              {group.decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {selected && (
        <div className="card border-base-300 bg-base-200 w-full border">
          <div className="card-body gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="card-title text-sm">{selected.title}</h2>
              <span className="badge badge-ghost badge-sm font-mono">
                {formatYear(selected.year)}
              </span>
            </div>
            <p className="text-base-content/70 text-xs leading-relaxed">
              {selected.description}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className={`badge badge-xs ${CATEGORY_COLORS[selected.category] ?? 'badge-ghost'}`}>
                {selected.category}
              </span>
              <span className="text-base-content/40 text-[10px]">
                {'★'.repeat(selected.difficulty)}
                {'☆'.repeat(5 - selected.difficulty)}
              </span>
            </div>
          </div>
        </div>
      )}

      <BrowseBody
        deck={deck}
        events={events}
        compareDeck={compareDeck}
        compareEvents={compareEvents}
        view={view}
        selectedId={selectedId}
        onSelect={(event) => setSelectedId(event.id)}
        bounds={compareBounds}
      />
    </div>
  );
};

BrowseScreen.displayName = 'BrowseScreen';
