import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DEFAULT_N,
  INTERVAL_DURATION,
  MATCH_KEY,
  NO_MATCH_KEY,
  STIMULUS_DURATION,
  TOTAL_STIMULI,
} from './constants';
import {
  Response,
  Trial,
  countTargets,
  generateTrials,
  hitRate,
} from './utils';

export type Phase = 'ready' | 'running' | 'result';

export const useNBack = () => {
  const [n, setN] = useState(DEFAULT_N);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [phase, setPhase] = useState<Phase>('ready');
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [showStimulus, setShowStimulus] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = null;
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setTrials(generateTrials(n, TOTAL_STIMULI));
    setCurrentIdx(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setPhase('running');
    setShowStimulus(true);
  }, [n, clearTimer]);

  const advance = useCallback(() => {
    const next = currentIdx + 1;

    if (next >= trials.length) {
      setPhase('result');
      clearTimer();

      return;
    }

    setCurrentIdx(next);
    setShowStimulus(false);
    timerRef.current = setTimeout(
      () => setShowStimulus(true),
      INTERVAL_DURATION
    );
  }, [currentIdx, trials.length, clearTimer]);

  const respond = useCallback(
    (response: Response) => {
      if (phase !== 'running' || currentIdx < 0) return;

      const trial = trials[currentIdx];

      if (!trial) return;

      if (trial.isTarget && response === 'match') {
        setHits((value) => value + 1);
      } else if (trial.isTarget) {
        setMisses((value) => value + 1);
      } else if (response === 'match') {
        setFalseAlarms((value) => value + 1);
      }

      advance();
    },
    [phase, currentIdx, trials, advance]
  );

  useEffect(() => {
    if (phase !== 'running' || !showStimulus || currentIdx < 0) {
      return clearTimer;
    }

    timerRef.current = setTimeout(() => {
      if (trials[currentIdx].isTarget) {
        setMisses((value) => value + 1);
      }

      advance();
    }, STIMULUS_DURATION);

    return clearTimer;
  }, [phase, showStimulus, currentIdx, trials, advance, clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === MATCH_KEY) respond('match');
      if (event.key === NO_MATCH_KEY) respond('no-match');
      if (event.key === 'Enter' && phase === 'ready') start();
    },
    [phase, respond, start]
  );

  return {
    n,
    setN,
    trials,
    currentIdx,
    phase,
    hits,
    misses,
    falseAlarms,
    showStimulus,
    totalTargets: countTargets(trials),
    accuracy: hitRate(hits, falseAlarms),
    start,
    respond,
    onKeyDown,
  };
};
