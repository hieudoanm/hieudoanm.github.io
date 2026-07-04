import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import {
  GRID_SIZE,
  TOTAL_STIMULI,
  STIMULUS_DURATION,
  INTERVAL_DURATION,
  DEFAULT_N,
  GRID_POSITIONS,
} from './constants';

interface Stimulus {
  position: number;
  letter: string;
}

interface Trial {
  stimulus: Stimulus;
  isTarget: boolean;
}

const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

const randomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];
const randomPosition = () =>
  GRID_POSITIONS[Math.floor(Math.random() * GRID_POSITIONS.length)];

const generateTrials = (n: number, count: number): Trial[] => {
  const trials: Trial[] = [];
  for (let i = 0; i < count; i++) {
    const stimulus: Stimulus = {
      position: randomPosition(),
      letter: randomLetter(),
    };
    if (i >= n) {
      const prev = trials[i - n].stimulus;
      const matchPos = Math.random() < 0.3;
      if (matchPos) {
        stimulus.position =
          Math.random() < 0.5 ? prev.position : stimulus.position;
        if (stimulus.position === prev.position) {
          stimulus.letter = Math.random() < 0.5 ? prev.letter : stimulus.letter;
        }
      }
    }
    const isTarget =
      i >= n && stimulus.position === trials[i - n].stimulus.position;
    trials.push({ stimulus, isTarget });
  }
  return trials;
};

export const NBackModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [n, setN] = useState(DEFAULT_N);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [phase, setPhase] = useState<'ready' | 'running' | 'result'>('ready');
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [showStimulus, setShowStimulus] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const startGame = useCallback(() => {
    clearTimer();
    const t = generateTrials(n, TOTAL_STIMULI);
    setTrials(t);
    setCurrentIdx(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setPhase('running');
    setShowStimulus(true);
  }, [n, clearTimer]);

  const respond = useCallback(
    (response: 'match' | 'no-match') => {
      if (phase !== 'running' || currentIdx < 0) return;
      const trial = trials[currentIdx];
      if (!trial) return;

      if (trial.isTarget) {
        if (response === 'match') setHits((h) => h + 1);
        else setMisses((m) => m + 1);
      } else if (response === 'match') {
        setFalseAlarms((f) => f + 1);
      }

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
    },
    [phase, currentIdx, trials, clearTimer]
  );

  useEffect(() => {
    if (phase === 'running' && showStimulus && currentIdx >= 0) {
      timerRef.current = setTimeout(() => {
        if (currentIdx < trials.length) {
          setMisses((m) => m + (trials[currentIdx].isTarget ? 1 : 0));
          const next = currentIdx + 1;
          if (next >= trials.length) {
            setPhase('result');
          } else {
            setCurrentIdx(next);
            setShowStimulus(false);
            timerRef.current = setTimeout(
              () => setShowStimulus(true),
              INTERVAL_DURATION
            );
          }
        }
      }, STIMULUS_DURATION);
    }
    return clearTimer;
  }, [phase, showStimulus, currentIdx, trials, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'a') respond('match');
      if (e.key === 'l') respond('no-match');
    },
    [onClose, respond]
  );

  const totalTargets = trials.filter((t) => t.isTarget).length;
  const accuracy = hits + falseAlarms > 0 ? hits / (hits + falseAlarms) : 0;

  return (
    <FullScreen onClose={onClose} title="N-Back Test">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-50">N-back</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((v) => (
              <button
                key={v}
                onClick={() => setN(v)}
                className={`btn btn-xs ${n === v ? 'btn-primary' : 'btn-ghost'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {phase === 'ready' && (
          <div className="flex flex-col items-center gap-3 py-8">
            <p className="text-center text-sm opacity-70">
              Watch the grid. Press <kbd className="kbd kbd-xs">A</kbd> when the
              position matches what you saw {n} steps ago.
            </p>
            <button onClick={startGame} className="btn btn-primary">
              Start
            </button>
            <p className="text-xs opacity-40">Press Enter</p>
          </div>
        )}

        {phase === 'running' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex w-full items-center justify-between text-xs opacity-50">
              <span>
                {currentIdx + 1}/{trials.length}
              </span>
              <span>Hits: {hits}</span>
            </div>
            <div
              className="grid w-48"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                aspectRatio: '1',
              }}>
              {GRID_POSITIONS.map((pos) => (
                <div
                  key={pos}
                  className={`border-base-300 flex items-center justify-center border text-lg font-normal transition-colors duration-100 ${showStimulus && currentIdx >= 0 && trials[currentIdx]?.stimulus.position === pos ? 'bg-primary text-primary-content' : 'bg-base-200'}`}>
                  {showStimulus &&
                  currentIdx >= 0 &&
                  trials[currentIdx]?.stimulus.position === pos
                    ? trials[currentIdx].stimulus.letter
                    : ''}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => respond('match')}
                className="btn btn-success btn-sm">
                Match (A)
              </button>
              <button
                onClick={() => respond('no-match')}
                className="btn btn-neutral btn-sm">
                No Match (L)
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="text-lg font-normal">
              {accuracy > 0.7 ? 'Great!' : 'Keep practicing'}
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              <span className="opacity-50">Hits</span>
              <span className="text-success">
                {hits}/{totalTargets}
              </span>
              <span className="opacity-50">Misses</span>
              <span className="text-error">{misses}</span>
              <span className="opacity-50">False Alarms</span>
              <span className="text-warning">{falseAlarms}</span>
              <span className="opacity-50">Accuracy</span>
              <span>{(accuracy * 100).toFixed(0)}%</span>
            </div>
            <button onClick={startGame} className="btn btn-primary btn-sm mt-2">
              Play Again
            </button>
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          A match · L no match · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
NBackModal.displayName = 'NBackModal';
