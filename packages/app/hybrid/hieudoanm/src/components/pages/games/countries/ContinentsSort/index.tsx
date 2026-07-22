'use client';

import { countries } from '@hieudoanm.github.io/data/countries';
import { FC, useCallback, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

const REGIONS = ['Africa', 'Europe', 'Asia', 'Oceania', 'Americas'] as const;
type Region = (typeof REGIONS)[number];

const REGION_COLORS: Record<
  Region,
  { bg: string; border: string; text: string }
> = {
  Africa: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500',
    text: 'text-amber-600',
  },
  Europe: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500',
    text: 'text-blue-600',
  },
  Asia: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-600' },
  Oceania: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500',
    text: 'text-teal-600',
  },
  Americas: {
    bg: 'bg-green-500/10',
    border: 'border-green-500',
    text: 'text-green-600',
  },
};

const REGION_MAP: Record<string, Region> = {
  Africa: 'Africa',
  Europe: 'Europe',
  Asia: 'Asia',
  Oceania: 'Oceania',
  Americas: 'Americas',
};

const POPULAR = countries
  .filter((c) => c.rank > 0 && REGION_MAP[c.region])
  .sort((a, b) => a.rank - b.rank);

const pickCountries = (count: number) => {
  const shuffled = [...POPULAR].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

interface Card {
  name: string;
  flag: string;
  correctRegion: Region;
  placedIn: Region | null;
}

export const ContinentsSort: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cards, setCards] = useState<Card[]>(() =>
    pickCountries(15).map((c) => ({
      name: c.name,
      flag: c.flag,
      correctRegion: REGION_MAP[c.region],
      placedIn: null,
    }))
  );
  const [buckets, setBuckets] = useState<Record<Region, string[]>>({
    Africa: [],
    Europe: [],
    Asia: [],
    Oceania: [],
    Americas: [],
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: 'correct' | 'wrong';
  } | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const unplaced = cards.filter((c) => !c.placedIn);
  const placedCount = cards.length - unplaced.length;

  const onDragStart = useCallback((name: string) => {
    setDragging(name);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  const onDrop = useCallback(
    (region: Region) => {
      if (!dragging) return;
      const card = cards.find((c) => c.name === dragging);
      if (!card || card.placedIn) return;

      const isCorrect = card.correctRegion === region;

      setCards((prev) =>
        prev.map((c) => (c.name === dragging ? { ...c, placedIn: region } : c))
      );
      setBuckets((prev) => ({
        ...prev,
        [region]: [...prev[region], dragging],
      }));
      setDragging(null);

      if (isCorrect) {
        setScore((s) => s + 1);
        setMessage({ text: `${dragging} → ${region}`, type: 'correct' });
      } else {
        setMistakes((m) => m + 1);
        setMessage({
          text: `${dragging} belongs to ${card.correctRegion}`,
          type: 'wrong',
        });
      }

      setTimeout(() => setMessage(null), 1000);

      if (placedCount + 1 === cards.length) {
        setTimeout(() => setGameOver(true), 600);
      }
    },
    [dragging, cards, placedCount]
  );

  const reset = useCallback(() => {
    const fresh = pickCountries(15).map((c) => ({
      name: c.name,
      flag: c.flag,
      correctRegion: REGION_MAP[c.region],
      placedIn: null,
    }));
    setCards(fresh);
    setBuckets({ Africa: [], Europe: [], Asia: [], Oceania: [], Americas: [] });
    setDragging(null);
    setMessage(null);
    setScore(0);
    setMistakes(0);
    setGameOver(false);
  }, []);

  return (
    <FullScreen onClose={onClose} title="Continents Sort">
      <div
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        className="mx-auto flex w-80 flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Placed:{' '}
            <strong>
              {placedCount} / {cards.length}
            </strong>
          </span>
          <span className="opacity-60">
            Mistakes: <strong>{mistakes}</strong>
          </span>
        </div>

        {message && (
          <div
            className={`text-center text-xs font-bold ${
              message.type === 'correct' ? 'text-success' : 'text-error'
            }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {REGIONS.map((region) => {
            const color = REGION_COLORS[region];
            const items = buckets[region];
            return (
              <div
                key={region}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(region)}
                className={`flex flex-col rounded-xl border-2 border-dashed p-2 transition-colors ${color.border} ${color.bg} min-h-[120px]`}>
                <span
                  className={`mb-1 text-center text-[10px] font-bold tracking-wider uppercase ${color.text}`}>
                  {region}
                </span>
                <div className="flex flex-1 flex-col gap-1">
                  {items.map((name) => {
                    const card = cards.find((c) => c.name === name)!;
                    const isWrong = card.correctRegion !== region;
                    return (
                      <div
                        key={name}
                        className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] ${
                          isWrong ? 'bg-error/20 line-through' : 'bg-success/20'
                        }`}>
                        <span>{card.flag}</span>
                        <span className="truncate">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {gameOver ? (
          <div className="flex flex-col items-center gap-2">
            <p
              className={`text-sm font-bold ${mistakes === 0 ? 'text-success' : 'text-error'}`}>
              {mistakes === 0
                ? 'Perfect! All correct!'
                : `Done — ${score}/${cards.length} correct`}
            </p>
            <button onClick={reset} className="btn btn-accent btn-sm w-full">
              New Game
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {unplaced.map((card) => (
              <div
                key={card.name}
                draggable
                onDragStart={() => onDragStart(card.name)}
                onDragEnd={onDragEnd}
                className={`btn btn-outline btn-sm cursor-grab gap-1.5 text-xs active:cursor-grabbing ${
                  dragging === card.name ? 'opacity-40' : ''
                }`}>
                <span>{card.flag}</span>
                <span>{card.name}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          Drag countries into continents · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
ContinentsSort.displayName = 'ContinentsSort';
