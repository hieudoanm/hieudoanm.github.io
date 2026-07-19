'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { FiCheck, FiFlag, FiMapPin, FiSmile, FiX } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { countries } from '../_shared/countries-data';
import type { GuessMode, GuessQuestion, QuizMessage } from './types';
import { useGuess } from './useGuess';
import { MODES } from './utils';

const FLAG_BY_NAME = new Map(
  countries.map((entry) => [entry.name, entry.flag])
);

const MODE_LABEL: Record<GuessMode, string> = {
  flag: 'Flag',
  emoji: 'Emoji',
  border: 'Borders',
};

const MODE_ICON: Record<GuessMode, IconType> = {
  flag: FiFlag,
  emoji: FiSmile,
  border: FiMapPin,
};

const questionKey = (question: GuessQuestion): string =>
  question.mode === 'border'
    ? question.currentName
    : `${question.mode}-${question.current.name}-${question.current.flag}`;

const promptContent = (
  question: GuessQuestion
): { main: string; hint: string } => {
  if (question.mode === 'border') {
    return {
      main: question.currentFlag,
      hint: `Which country does ${question.currentName} border?`,
    };
  }
  if (question.mode === 'emoji') {
    return {
      main: question.current.name,
      hint: 'Which flag belongs to this country?',
    };
  }
  return {
    main: question.current.flag,
    hint: 'Which country does this flag belong to?',
  };
};

interface OptionsGridProps {
  question: GuessQuestion;
  message: QuizMessage;
  picked: string | null;
  onPick: (value: string) => void;
}

const optionTone = (
  message: QuizMessage,
  picked: string | null,
  isCorrect: boolean,
  value: string
): 'idle' | 'correct' | 'wrong' | 'dimmed' => {
  if (!message) return 'idle';
  if (isCorrect) return 'correct';
  if (picked === value) return 'wrong';
  return 'dimmed';
};

const OPTION_CLASS = (
  state: 'idle' | 'correct' | 'wrong' | 'dimmed'
): string => {
  if (state === 'correct')
    return 'animate-[guess-pop_0.3s_ease-out] btn-success';
  if (state === 'wrong')
    return 'animate-[guess-shake_0.3s_ease-in-out] btn-error';
  if (state === 'dimmed') return 'btn-ghost opacity-40';
  return 'btn-accent';
};

const OptionsGrid: FC<OptionsGridProps> = ({
  question,
  message,
  picked,
  onPick,
}) => {
  if (question.mode === 'border') {
    return (
      <div className="grid gap-2 sm:grid-cols-2" data-testid="guess-options">
        {question.options.map((name, index) => {
          const isCorrect = name === question.correct;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onPick(name)}
              disabled={Boolean(message)}
              data-testid={`guess-option-${index}`}
              className={`btn btn-sm justify-start gap-2 transition-all hover:scale-[1.02] active:scale-95 ${OPTION_CLASS(optionTone(message, picked, isCorrect, name))}`}>
              <span className="text-xs opacity-40">{index + 1}</span>
              <span className="text-lg leading-none">
                {FLAG_BY_NAME.get(name)}
              </span>
              <span className="truncate">{name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-2 ${question.mode === 'emoji' ? 'grid-cols-2' : 'sm:grid-cols-2'}`}
      data-testid="guess-options">
      {question.options.map((option, index) => {
        const value = question.mode === 'flag' ? option.name : option.flag;
        const isCorrect =
          value ===
          (question.mode === 'flag'
            ? question.current.name
            : question.current.flag);
        return (
          <button
            key={`${option.flag}-${option.name}`}
            type="button"
            onClick={() => onPick(value)}
            disabled={Boolean(message)}
            aria-label={option.name}
            data-testid={`guess-option-${index}`}
            className={`btn btn-sm gap-2 transition-all hover:scale-[1.02] active:scale-95 ${question.mode === 'emoji' ? 'justify-center' : 'justify-start'} ${OPTION_CLASS(optionTone(message, picked, isCorrect, value))}`}>
            <span className="text-xs opacity-40">{index + 1}</span>
            <span
              className={
                question.mode === 'emoji' ? 'text-2xl leading-none' : 'truncate'
              }>
              {question.mode === 'emoji' ? option.flag : option.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const Guess: FC = () => {
  const {
    mode,
    question,
    stats,
    message,
    revealed,
    neighbours,
    chooseMode,
    guess,
    next,
  } = useGuess();
  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (value: string): void => {
    setPicked(value);
    guess(value);
  };

  const prompt = promptContent(question);

  return (
    <div className="mx-auto flex w-full flex-col gap-4 p-4 sm:w-2/3 md:w-1/2">
      <div className="flex items-center justify-between text-sm">
        <h1 className="text-lg font-bold">Guess the Country</h1>
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
              onClick={() => {
                setPicked(null);
                chooseMode(item);
              }}
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
          Streak: <strong>{stats.streak}</strong> / Best:{' '}
          <strong>{stats.bestStreak}</strong>
        </span>
      </div>

      <div
        key={questionKey(question)}
        className="from-primary/10 via-base-200 to-accent/10 border-base-300 flex animate-[guess-pop_0.3s_ease-out] flex-col items-center gap-2 rounded-2xl border bg-gradient-to-br py-10"
        data-testid="guess-prompt">
        <span
          className={
            question.mode === 'emoji'
              ? 'text-3xl leading-none font-medium'
              : 'text-7xl leading-none'
          }>
          {prompt.main}
        </span>
        <p className="text-center text-xs opacity-60">{prompt.hint}</p>
      </div>

      <OptionsGrid
        question={question}
        message={message}
        picked={picked}
        onPick={handlePick}
      />

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            role="status"
            data-testid="guess-message"
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${message.correct ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
            {message.correct ? <FiCheck /> : <FiX />}
            {message.text}
          </div>
          {revealed ? (
            <p
              className="text-center text-xs opacity-50"
              data-testid="guess-neighbours">
              Neighbors: {neighbours.join(', ')}
            </p>
          ) : null}
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="guess-next">
            Next Country
          </button>
        </div>
      ) : null}
    </div>
  );
};

Guess.displayName = 'Guess';
