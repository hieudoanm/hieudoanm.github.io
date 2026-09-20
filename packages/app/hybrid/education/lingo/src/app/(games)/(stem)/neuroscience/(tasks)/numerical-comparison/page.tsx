'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'hard';
type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Trial {
  left: number;
  right: number;
  difficulty: Difficulty;
  correct: boolean;
  rt: number | null;
}

// ─── Stimulus generator ───────────────────────────────────────────────────────

const buildTrials = (n: number): Omit<Trial, 'rt' | 'correct'>[] => {
  const trials: Omit<Trial, 'rt' | 'correct'>[] = [];
  for (let i = 0; i < n; i++) {
    const isEasy = i % 2 === 0;
    let left: number, right: number;
    if (isEasy) {
      // Large numerical distance → easy
      left = Math.ceil(Math.random() * 4) + 1; // 2–5
      right = Math.ceil(Math.random() * 4) + 5; // 6–9
    } else {
      // Small distance → hard (adjacent digits)
      const base = Math.ceil(Math.random() * 7) + 1; // 2–8
      left = base;
      right = base + 1;
    }
    // Randomly swap left/right
    if (Math.random() < 0.5) [left, right] = [right, left];
    trials.push({ left, right, difficulty: isEasy ? 'easy' : 'hard' });
  }
  return trials.sort(() => Math.random() - 0.5);
};

const N_TRIALS = 20;

// ─── Summary ──────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const easy = trials.filter((t) => t.difficulty === 'easy');
  const hard = trials.filter((t) => t.difficulty === 'hard');
  const meanRT = (ts: Trial[]) => {
    const rts = ts
      .filter((t) => t.rt !== null && t.correct)
      .map((t) => t.rt as number);
    return rts.length
      ? Math.round(rts.reduce((a, b) => a + b) / rts.length)
      : 0;
  };
  const acc = (ts: Trial[]) =>
    ts.length
      ? Math.round((ts.filter((t) => t.correct).length / ts.length) * 100)
      : 0;
  const distEffect = meanRT(hard) - meanRT(easy);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🔢</div>
      <h2 className="text-primary text-2xl font-bold">Results</h2>
      <div className="grid w-full max-w-lg grid-cols-2 gap-3">
        {[
          {
            label: 'Easy (large gap) RT',
            value: `${meanRT(easy)} ms`,
            cls: 'text-success',
          },
          {
            label: 'Hard (small gap) RT',
            value: `${meanRT(hard)} ms`,
            cls: 'text-warning',
          },
          {
            label: 'Easy accuracy',
            value: `${acc(easy)}%`,
            cls: 'text-success',
          },
          {
            label: 'Hard accuracy',
            value: `${acc(hard)}%`,
            cls: 'text-warning',
          },
          {
            label: 'Distance Effect',
            value: `+${distEffect} ms`,
            cls: 'text-primary',
          },
        ].map(({ label, value, cls }) => (
          <div
            key={label}
            className="card border-base-content/10 flex flex-col items-center gap-1 border p-4">
            <span className={`font-mono text-2xl font-bold ${cls}`}>
              {value}
            </span>
            <span className="text-base-content/50 text-xs">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-base-content/60 max-w-md text-center text-sm">
        The <strong>distance effect</strong>: larger numerical gaps between
        digits yield faster, more accurate responses. The DDM models this as
        higher drift rate for easy comparisons — clearer evidence for the larger
        digit.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};

// ─── Main experiment ──────────────────────────────────────────────────────────

const NumericalComparisonGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [trialDefs] = useState(() => buildTrials(N_TRIALS));
  const [idx, setIdx] = useState(0);
  const [trials, setTrials] = useState<Trial[]>([]);
  const stimStart = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const nextTrial = useCallback(
    (done: Trial[]) => {
      if (done.length >= N_TRIALS) {
        setPhase('done');
        return;
      }
      setIdx(done.length);
      setPhase('fixation');
      timer.current = setTimeout(() => {
        stimStart.current = performance.now();
        setPhase('stimulus');
        timer.current = setTimeout(() => {
          const miss: Trial = {
            ...trialDefs[done.length],
            rt: null,
            correct: false,
          };
          const updated = [...done, miss];
          setTrials(updated);
          setPhase('feedback');
          timer.current = setTimeout(() => nextTrial(updated), 600);
        }, 3000);
      }, 500);
    },
    [trialDefs]
  );

  const respond = useCallback(
    (side: 'left' | 'right') => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimStart.current);
      const def = trialDefs[idx];
      const correctSide = def.left > def.right ? 'left' : 'right';
      const correct = side === correctSide;
      const t: Trial = { ...def, rt, correct };
      const updated = [...trials, t];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(() => nextTrial(updated), 600);
    },
    [phase, idx, trialDefs, trials, nextTrial]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') respond('left');
      if (e.key === 'ArrowRight') respond('right');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [respond]);

  useEffect(() => () => clearTimer(), []);

  if (phase === 'done')
    return (
      <Summary
        trials={trials}
        onReset={() => {
          setTrials([]);
          setIdx(0);
          setPhase('ready');
        }}
      />
    );

  const def = trialDefs[idx];
  const lastTrial = trials[trials.length - 1];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full items-center gap-2">
        <div className="bg-base-300 h-2 w-full rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(trials.length / N_TRIALS) * 100}%` }}
          />
        </div>
        <span className="text-base-content/50 text-xs whitespace-nowrap">
          {trials.length}/{N_TRIALS}
        </span>
      </div>

      <div className="border-base-content/10 bg-base-200/30 flex h-40 w-full max-w-md flex-col items-center justify-center rounded-xl border">
        {phase === 'ready' && (
          <p className="text-base-content/60 text-sm">Press Start to begin</p>
        )}
        {phase === 'fixation' && (
          <span className="text-primary text-4xl font-bold">+</span>
        )}
        {phase === 'stimulus' && (
          <div className="flex items-center gap-12">
            <span className="font-mono text-6xl font-bold">{def.left}</span>
            <span className="text-base-content/30 text-2xl">vs</span>
            <span className="font-mono text-6xl font-bold">{def.right}</span>
          </div>
        )}
        {phase === 'feedback' && lastTrial && (
          <span
            className={`text-4xl font-bold ${lastTrial.correct ? 'text-success' : 'text-error'}`}>
            {lastTrial.correct ? '✓' : '✗'}
            {lastTrial.rt !== null && (
              <span className="ml-3 font-mono text-xl">{lastTrial.rt} ms</span>
            )}
          </span>
        )}
      </div>

      <p className="text-base-content/60 text-sm">
        Which number is <strong>larger</strong>?
      </p>

      {phase === 'ready' && (
        <button
          type="button"
          onClick={() => nextTrial([])}
          className="btn btn-primary">
          Start Experiment
        </button>
      )}
      {phase === 'stimulus' && (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => respond('left')}
            className="btn btn-outline btn-lg">
            ← Left is larger
          </button>
          <button
            type="button"
            onClick={() => respond('right')}
            className="btn btn-outline btn-lg">
            Right is larger →
          </button>
        </div>
      )}
      {(phase === 'fixation' || phase === 'feedback') && (
        <div className="flex gap-4 opacity-30">
          <button type="button" disabled className="btn btn-outline btn-lg">
            ← Left is larger
          </button>
          <button type="button" disabled className="btn btn-outline btn-lg">
            Right is larger →
          </button>
        </div>
      )}
      <p className="text-base-content/40 text-xs">Keyboard: ← Left · Right →</p>
    </div>
  );
};

const NumericalComparisonPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Numerical Comparison Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Choose which of two digits is <strong>larger</strong> as fast as possible.
      The <strong>distance effect</strong> — larger gaps are easier — is
      explained by the DDM as higher drift rates for more discriminable digit
      pairs.
    </p>
    <NumericalComparisonGame />
  </div>
);

export default NumericalComparisonPage;
