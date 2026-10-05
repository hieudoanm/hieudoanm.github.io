'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DEFAULT_TRIALS, FEEDBACK_MS, HOTKEY_BY_INDEX } from './constants';
import { createTrial, randomChoice, summarize } from './utils';
import { Choice, Phase, Trial } from './types';

const defaultNow = (): number =>
  typeof performance === 'undefined' ? Date.now() : performance.now();

export interface ReactionMatchOptions {
  now?: () => number;
}

export const useReactionMatch = (options: ReactionMatchOptions = {}) => {
  const now = options.now ?? defaultNow;
  const [phase, setPhase] = useState<Phase>('idle');
  const [bot, setBot] = useState<Choice | null>(null);
  const [last, setLast] = useState<Trial | null>(null);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [totalTrials, setTotalTrials] = useState(DEFAULT_TRIALS);
  const shownAtRef = useRef(0);

  const summary = useMemo(() => summarize(trials), [trials]);

  const reveal = useCallback(() => {
    setBot(randomChoice());
    shownAtRef.current = now();
    setPhase('awaiting');
  }, [now]);

  const start = useCallback(() => {
    setTrials([]);
    setLast(null);
    reveal();
  }, [reveal]);

  const respond = useCallback(
    (human: Choice) => {
      if (phase !== 'awaiting' || !bot) return;

      const trial = createTrial(
        trials.length,
        bot,
        human,
        shownAtRef.current,
        now()
      );

      setTrials((prev) => [...prev, trial]);
      setLast(trial);
      setPhase('feedback');
    },
    [bot, now, phase, trials.length]
  );

  const advance = useCallback(() => {
    if (trials.length >= totalTrials) {
      setPhase('done');

      return;
    }

    reveal();
  }, [reveal, totalTrials, trials.length]);

  const reset = useCallback(() => {
    setTrials([]);
    setLast(null);
    setBot(null);
    setPhase('idle');
  }, []);

  useEffect(() => {
    if (phase !== 'feedback') return;

    const timer = window.setTimeout(advance, FEEDBACK_MS);

    return () => window.clearTimeout(timer);
  }, [advance, phase]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const choice = HOTKEY_BY_INDEX[event.key];

      if (choice) {
        event.preventDefault();
        respond(choice);

        return;
      }

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();

        if (phase === 'idle' || phase === 'done') start();
        if (phase === 'feedback') advance();
      }

      if (event.key === 'r' || event.key === 'R') reset();
    },
    [advance, phase, reset, respond, start]
  );

  return {
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
  };
};
