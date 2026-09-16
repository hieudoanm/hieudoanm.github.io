'use client';

import type { FC, ReactElement } from 'react';
import { FiBookOpen, FiCheck, FiUsers, FiX } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useHigherOrLower } from './useHigherOrLower';
import type { HLMode, HLSide } from './types';
import { formatNum, isHigherCorrect, isLowerRankCorrect, MODES } from './utils';

const MODE_LABEL: Record<HLMode, string> = {
  population: 'Population',
  passport: 'Passport',
};

const MODE_ICON: Record<HLMode, IconType> = {
  population: FiUsers,
  passport: FiBookOpen,
};

const PROMPT: Record<HLMode, string> = {
  population: 'Which country has a larger population?',
  passport: 'Which country has a stronger passport?',
};

const valueLabel = (mode: HLMode, value: number): string =>
  mode === 'passport' ? `#${value}` : formatNum(value);

const CARD_CLASS = (state: 'idle' | 'correct' | 'wrong'): string => {
  if (state === 'correct')
    return 'animate-[guess-pop_0.3s_ease-out] border-success bg-success/10';
  if (state === 'wrong')
    return 'animate-[guess-shake_0.3s_ease-in-out] border-error bg-error/10 opacity-50';
  return 'border-base-300 hover:border-primary cursor-pointer';
};

const VALUE_CLASS = (mode: HLMode, strong: boolean): string =>
  mode === 'passport'
    ? strong
      ? 'text-success'
      : 'text-base-content/40'
    : 'text-base-content';

export const HigherOrLower: FC = () => {
  const {
    mode,
    question,
    stats,
    games,
    message,
    revealed,
    chooseMode,
    guess,
    next,
  } = useHigherOrLower();

  const isSideCorrect = (side: HLSide): boolean =>
    question.mode === 'passport'
      ? isLowerRankCorrect(side, question.leftValue, question.rightValue)
      : isHigherCorrect(side, question.leftValue, question.rightValue);

  const renderCard = (side: HLSide): ReactElement => {
    const entry = question.pair[side];
    const value = valueLabel(
      question.mode,
      side === 'left' ? question.leftValue : question.rightValue
    );
    const strong = isSideCorrect(side);
    const state: 'idle' | 'correct' | 'wrong' = !revealed
      ? 'idle'
      : strong
        ? 'correct'
        : 'wrong';
    return (
      <button
        type="button"
        onClick={() => guess(side)}
        disabled={revealed}
        data-testid={`hl-card-${side}`}
        className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-6 transition-all ${CARD_CLASS(state)}`}>
        <span className="text-5xl leading-none">{entry.flag}</span>
        <span className="text-sm font-medium">{entry.name}</span>
        {revealed ? (
          <span
            className={`animate-[guess-pop_0.3s_ease-out] text-lg font-bold ${VALUE_CLASS(question.mode, strong)}`}
            data-testid={`hl-value-${side}`}>
            {value}
          </span>
        ) : null}
      </button>
    );
  };

  const pairKey = `${question.mode}-${question.pair.left.name}-${question.pair.right.name}`;

  return (
    <div className="mx-auto flex w-full flex-col gap-4 p-4 sm:w-2/3 md:w-1/2">
      <div className="flex items-center justify-between text-sm">
        <h1 className="text-lg font-bold">Higher or Lower</h1>
        <span className="text-base-content/60 flex items-center gap-1.5">
          {stats.streak > 0 && <span aria-hidden="true">🔥</span>}
          <span>
            Streak <strong>{stats.streak}</strong> / Best{' '}
            <strong>{stats.bestStreak}</strong>
          </span>
        </span>
      </div>

      <div className="bg-base-200 border-base-300 flex gap-1 rounded-xl border p-1">
        {MODES.map((item) => {
          const Icon = MODE_ICON[item];
          const active = mode === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => chooseMode(item)}
              aria-pressed={active}
              data-testid={`mode-${item}`}
              className={`btn btn-sm flex-1 gap-1.5 rounded-lg transition-all ${active ? 'btn-primary' : 'btn-ghost text-base-content/60 hover:text-base-content'}`}>
              <Icon className={active ? '' : 'opacity-60'} />
              {MODE_LABEL[item]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>
          Score: <strong className="text-primary">{stats.score}</strong>
        </span>
        <span className="opacity-60">
          Answered: <strong>{games}</strong> / Accuracy:{' '}
          <strong>
            {games > 0 ? `${Math.round((stats.score / games) * 100)}%` : '—'}
          </strong>
        </span>
      </div>

      <div
        key={pairKey}
        className="from-primary/10 via-base-200 to-accent/10 border-base-300 flex animate-[guess-pop_0.3s_ease-out] flex-col items-center gap-2 rounded-2xl border bg-gradient-to-br px-4 py-8"
        data-testid="hl-prompt">
        <p className="text-center text-sm font-bold">{PROMPT[question.mode]}</p>
        <p className="text-center text-xs opacity-60">
          {question.mode === 'passport'
            ? 'Stronger passport wins — lower rank means more visa-free access (#1 = best).'
            : 'Pick the country with the larger population.'}
        </p>
      </div>

      <div className="flex gap-3">
        {renderCard('left')}
        <div className="flex items-center">
          <span className="text-sm font-bold opacity-20">VS</span>
        </div>
        {renderCard('right')}
      </div>

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            role="status"
            data-testid="hl-message"
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${message.correct ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
            {message.correct ? <FiCheck /> : <FiX />}
            {message.text}
          </div>
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="hl-next">
            Next Pair
          </button>
        </div>
      ) : null}
    </div>
  );
};

HigherOrLower.displayName = 'HigherOrLower';
