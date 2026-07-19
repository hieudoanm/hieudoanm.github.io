import { FC, useState } from 'react';
import { DECKS } from '../../data/decks';
import { EVENT_SETS } from '../../data/constants';
import { MODES } from '../../data/modes';
import { CONTINENT_LABELS, CONTINENT_ORDER } from '../../data/continents';
import { useGameStore } from '../../store';
import type { DeckId, GameMode } from '../../types';

const CONTINENT_GROUPS = CONTINENT_ORDER.map((continent) => ({
  continent,
  decks: DECKS.filter((deck) => deck.continent === continent),
})).filter((group) => group.decks.length > 0);

export const SetupScreen: FC = () => {
  const startGame = useGameStore((s) => s.startGame);
  const openBrowse = useGameStore((s) => s.openBrowse);
  const [deckId, setDeckId] = useState<DeckId>('world');
  const [mode, setMode] = useState<GameMode>('classic');

  const selectedDeck = DECKS.find((deck) => deck.id === deckId)!;
  const selectedMode = MODES.find(({ mode: m }) => m === mode)!;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-xl font-light tracking-tight">Through the Years</h1>
        <p className="text-base-content/50 mt-1 text-xs">
          Place historical events on the timeline in the correct order.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
          Choose events
        </span>
        {CONTINENT_GROUPS.map(({ continent, decks }) => (
          <div key={continent} className="flex flex-col gap-1">
            <span className="text-base-content/40 text-[10px] tracking-wider uppercase">
              {CONTINENT_LABELS[continent]}
            </span>
            <div className="flex flex-wrap gap-2">
              {decks.map((deck) => (
                <button
                  key={deck.id}
                  onClick={() => setDeckId(deck.id)}
                  className={`btn btn-sm ${
                    deckId === deck.id ? 'btn-primary' : 'btn-outline'
                  }`}>
                  {deck.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="text-base-content/50 text-xs">
          {selectedDeck.description} · {EVENT_SETS[deckId].length} events
        </p>
      </div>

      <button
        onClick={() => openBrowse(deckId)}
        className="btn btn-outline w-full">
        Browse timeline
      </button>

      <div className="flex w-full flex-col gap-2">
        <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
          Choose mode
        </span>
        <div className="flex flex-wrap gap-2">
          {MODES.map(({ mode: m, label }) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`btn btn-sm ${
                mode === m ? 'btn-primary' : 'btn-outline'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-base-content/50 text-xs">
          {selectedMode.description}
        </p>
      </div>

      <button
        onClick={() => startGame(mode, deckId)}
        className="btn btn-primary w-full">
        Play
      </button>
    </div>
  );
};

SetupScreen.displayName = 'SetupScreen';
