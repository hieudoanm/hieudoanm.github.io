import { FC, useMemo, useState } from 'react';
import {
  dueCards,
  loadSchedule,
  newSchedule,
  reviewCard,
  saveSchedule,
  selectSampleOpenings,
} from '../utils/opening';
import type { OpeningCard, ScheduleEntry } from '../types';

export const OpeningTab: FC = () => {
  const cards: OpeningCard[] = useMemo(() => selectSampleOpenings(32), []);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(() => {
    const saved = loadSchedule();
    if (saved && saved.length === cards.length) return saved;
    return newSchedule(cards);
  });
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const due = useMemo(() => dueCards(schedule).map((s) => s.eco), [schedule]);
  const current = useMemo(
    () => schedule.find((s) => s.due <= Date.now()),
    [schedule]
  );
  const card = useMemo(
    () => cards.find((c) => c.eco === current?.eco),
    [cards, current]
  );

  const rate = (quality: number) => {
    if (!current) return;
    const updated = schedule.map((s) =>
      s.eco === current.eco ? reviewCard(s, quality) : s
    );
    setSchedule(updated);
    saveSchedule(updated);
    setRevealed(false);
    setDone((d) => d + 1);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold">Openings (spaced repetition)</h3>
        <div className="mt-3 space-y-2 text-sm">
          <p className="opacity-70">
            Due now: <span className="font-semibold">{due.length}</span>
          </p>
          <p className="opacity-70">
            Reviewed this session: <span className="font-semibold">{done}</span>
          </p>
          <p className="opacity-70">
            Total cards:{' '}
            <span className="font-semibold">{schedule.length}</span>
          </p>
        </div>
      </div>

      <div className="card bg-base-200 p-4">
        {!card || !current ? (
          <p className="text-sm opacity-70">
            All caught up! No openings are due right now.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{card.name}</h4>
              <span className="badge badge-outline badge-sm">{card.eco}</span>
            </div>
            <p className="mt-1 text-xs opacity-60">
              Interval {current.interval}d · Ease {current.ease} · Reps{' '}
              {current.reps}
            </p>

            {!revealed ? (
              <div className="mt-4">
                <p className="text-sm opacity-70">
                  Recall the move sequence, then reveal to check yourself.
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="btn btn-primary btn-sm mt-3">
                  Reveal
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="bg-base-100 rounded p-3 font-mono text-sm">
                  {card.pgn}
                </p>
                <p className="mt-3 text-xs opacity-60">
                  How well did you know it?
                </p>
                <div className="mt-2 flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((q) => (
                    <button
                      key={q}
                      onClick={() => rate(q)}
                      className={`btn btn-xs ${
                        q < 3
                          ? 'btn-error'
                          : q < 4
                            ? 'btn-warning'
                            : 'btn-success'
                      }`}>
                      {q}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[10px] opacity-50">
                  0–2 again · 3 hard · 4 good · 5 easy
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
OpeningTab.displayName = 'OpeningTab';
