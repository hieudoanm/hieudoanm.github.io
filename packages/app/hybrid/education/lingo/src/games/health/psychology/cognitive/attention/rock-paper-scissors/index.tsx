'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { CHOICES, GLYPHS, HOTKEYS, LABELS, TRIAL_OPTIONS } from './constants';
import { useReactionMatch } from './useReactionMatch';
import { counterFor, formatMs, formatPercent, reading } from './utils';

const PROMPTS: Record<string, string> = {
  idle: 'The bot commits first. You only counter.',
  awaiting: 'Counter it — as fast as you can.',
  feedback: 'Locking in…',
  done: 'Block complete.',
};

export const RockPaperScissors: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    phase,
    bot,
    last,
    trials,
    summary,
    totalTrials,
    setTotalTrials,
    start,
    respond,
    advance,
    reset,
    onKeyDown,
  } = useReactionMatch();

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const correctChoice = bot ? counterFor(bot) : null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-1 flex-col gap-3 outline-none">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span>
          Trial <strong>{Math.min(trials.length + 1, totalTrials)}</strong>/
          <strong>{totalTrials}</strong>
        </span>
        <span>
          Accuracy: <strong>{formatPercent(summary.accuracy)}</strong>
        </span>
        <span>
          Mean RT: <strong>{formatMs(summary.meanMs)}</strong>
        </span>
        <span>
          Lapses: <strong>{summary.lapses}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="opacity-60">Block size</span>
        <select
          value={totalTrials}
          disabled={phase === 'awaiting' || phase === 'feedback'}
          onChange={(event) => setTotalTrials(Number(event.target.value))}
          aria-label="Block size"
          className="select select-bordered select-xs w-20">
          {TRIAL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="border-base-content/20 flex flex-col items-center gap-1 rounded-lg border p-6">
        <span className="text-xs uppercase opacity-50">Bot move</span>
        <span className="text-5xl" aria-hidden="true">
          {bot ? GLYPHS[bot] : '❔'}
        </span>
        <span className="text-sm font-bold">{bot ? LABELS[bot] : '—'}</span>
        <span className="text-xs opacity-60">{PROMPTS[phase]}</span>
      </div>

      {last && phase === 'feedback' && (
        <div
          role="status"
          className={`alert justify-center py-2 text-sm ${
            last.correct ? 'alert-success' : 'alert-error'
          }`}>
          {last.correct ? 'Countered' : 'Missed'} in {formatMs(last.reactionMs)}
          {!last.correct && correctChoice
            ? ` — the answer was ${LABELS[correctChoice]}`
            : ''}
          {last.anticipatory ? ' (too fast to see it)' : ''}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {CHOICES.map((choice) => {
          const isAnswer = choice === correctChoice;

          return (
            <button
              key={choice}
              type="button"
              disabled={phase !== 'awaiting'}
              onClick={() => respond(choice)}
              className={`btn btn-sm ${
                phase === 'awaiting'
                  ? 'btn-outline'
                  : isAnswer && last
                    ? 'btn-success'
                    : 'btn-ghost'
              }`}>
              <span aria-hidden="true">{GLYPHS[choice]}</span>
              <span className="hidden sm:inline">{LABELS[choice]}</span>
              <span className="opacity-50">{HOTKEYS[choice]}</span>
            </button>
          );
        })}
      </div>

      {trials.length > 0 && (
        <div className="flex flex-wrap gap-1" aria-label="Trial history">
          {trials.map((trial) => (
            <span
              key={trial.index}
              className={`h-2 w-2 rounded-full ${
                trial.correct ? 'bg-success' : 'bg-error'
              }`}
            />
          ))}
        </div>
      )}

      {phase === 'done' && (
        <div className="border-base-content/20 flex flex-col gap-2 rounded-lg border p-3 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
            <span>
              Accuracy: <strong>{formatPercent(summary.accuracy)}</strong>
            </span>
            <span>
              Mean RT: <strong>{formatMs(summary.meanMs)}</strong>
            </span>
            <span>
              Median RT: <strong>{formatMs(summary.medianMs)}</strong>
            </span>
            <span>
              Fastest: <strong>{formatMs(summary.bestMs)}</strong>
            </span>
            <span>
              Lapses: <strong>{summary.lapses}</strong>
            </span>
            <span>
              Drift: <strong>{formatMs(Math.abs(summary.driftMs))}</strong>
            </span>
          </div>
          <p className="text-xs opacity-70">{reading(summary)}</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {(phase === 'idle' || phase === 'done') && (
          <button
            type="button"
            onClick={start}
            className="btn btn-primary btn-sm">
            {phase === 'done' ? 'Run again' : 'Start block'}
          </button>
        )}
        {phase === 'feedback' && (
          <button
            type="button"
            onClick={advance}
            className="btn btn-primary btn-sm">
            Next trial
          </button>
        )}
        {trials.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="btn btn-ghost btn-sm">
            Reset
          </button>
        )}
      </div>

      <p className="text-center text-xs opacity-50">
        1-3 to counter · Space to skip · R to reset
      </p>
    </div>
  );
};

RockPaperScissors.displayName = 'RockPaperScissors';
