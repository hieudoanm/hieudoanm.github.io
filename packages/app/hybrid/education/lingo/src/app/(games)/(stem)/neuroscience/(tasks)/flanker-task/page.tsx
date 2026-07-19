'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ──────────────────────────────────────────────────────────────────

type Direction = 'left' | 'right';
type Congruency = 'congruent' | 'incongruent';
type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Trial {
  target: Direction;
  congruency: Congruency;
  stimulusMs: number;
  rt: number | null;
  correct: boolean | null;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const N_TRIALS = 20;
const FIXATION_MS = 500;
const STIMULUS_MS = 2000;

const buildTrials = (): Omit<Trial, 'rt' | 'correct'>[] => {
  const targets: Direction[] = ['left', 'right'];
  const congruencies: Congruency[] = ['congruent', 'incongruent'];
  const trials: Omit<Trial, 'rt' | 'correct'>[] = [];
  for (let i = 0; i < N_TRIALS; i++) {
    trials.push({
      target: targets[i % 2],
      congruency: congruencies[Math.floor(i / 2) % 2],
      stimulusMs: STIMULUS_MS,
    });
  }
  // shuffle
  return trials.sort(() => Math.random() - 0.5);
};

const flankerString = (target: Direction, congruency: Congruency): string => {
  const arrow = target === 'right' ? '→' : '←';
  const flank =
    congruency === 'congruent' ? arrow : target === 'right' ? '←' : '→';
  return `${flank} ${flank} ${arrow} ${flank} ${flank}`;
};

// ─── Summary ────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const cong = trials.filter((t) => t.congruency === 'congruent');
  const incong = trials.filter((t) => t.congruency === 'incongruent');
  const meanRT = (ts: Trial[]) => {
    const rts = ts.filter((t) => t.rt !== null).map((t) => t.rt as number);
    return rts.length
      ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length)
      : 0;
  };
  const acc = (ts: Trial[]) => {
    const correct = ts.filter((t) => t.correct).length;
    return ts.length ? Math.round((correct / ts.length) * 100) : 0;
  };
  const congEffect = meanRT(incong) - meanRT(cong);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🧠</div>
      <h2 className="text-primary text-2xl font-bold">Results</h2>
      <div className="grid w-full max-w-lg grid-cols-2 gap-3">
        {[
          {
            label: 'Congruent RT',
            value: `${meanRT(cong)} ms`,
            cls: 'text-success',
          },
          {
            label: 'Incongruent RT',
            value: `${meanRT(incong)} ms`,
            cls: 'text-warning',
          },
          {
            label: 'Congruent Acc.',
            value: `${acc(cong)}%`,
            cls: 'text-success',
          },
          {
            label: 'Incongruent Acc.',
            value: `${acc(incong)}%`,
            cls: 'text-warning',
          },
          {
            label: 'Flanker Effect (RT)',
            value: `+${congEffect} ms`,
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
        In the Flanker task, incongruent flankers slow responses and increase
        errors. The <strong>Flanker Effect</strong> ({congEffect > 0 ? '+' : ''}
        {congEffect} ms) is the congruency cost captured by the DDM as a reduced
        drift rate.
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

// ─── Main experiment ─────────────────────────────────────────────────────────

const FlankerGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [trialDefs] = useState(() => buildTrials());
  const [idx, setIdx] = useState(0);
  const [trials, setTrials] = useState<Trial[]>([]);
  const stimulusStart = useRef<number>(0);
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
  };

  const nextTrial = useCallback(
    (completed: Trial[]) => {
      const next = completed.length;
      if (next >= N_TRIALS) {
        setPhase('done');
        return;
      }
      setIdx(next);
      setPhase('fixation');
      phaseTimer.current = setTimeout(() => {
        stimulusStart.current = performance.now();
        setPhase('stimulus');
        phaseTimer.current = setTimeout(() => {
          setTrials((prev) => [
            ...prev,
            { ...trialDefs[next], rt: null, correct: false },
          ]);
          setPhase('feedback');
          phaseTimer.current = setTimeout(
            () =>
              nextTrial([
                ...completed,
                { ...trialDefs[next], rt: null, correct: false },
              ]),
            600
          );
        }, STIMULUS_MS);
      }, FIXATION_MS);
    },
    [trialDefs]
  );

  const respond = useCallback(
    (dir: Direction) => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimulusStart.current);
      const def = trialDefs[idx];
      const correct = dir === def.target;
      const trial: Trial = { ...def, rt, correct };
      const updated = [...trials, trial];
      setTrials(updated);
      setPhase('feedback');
      phaseTimer.current = setTimeout(() => nextTrial(updated), 600);
    },
    [phase, idx, trialDefs, trials, nextTrial]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') respond('left');
      if (e.key === 'ArrowRight') respond('right');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [respond]);

  useEffect(() => () => clearTimer(), []);

  if (phase === 'done') {
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
  }

  const def = trialDefs[idx];
  const lastTrial = trials[trials.length - 1];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
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

      {/* Stimulus area */}
      <div className="border-base-content/10 bg-base-200/30 flex h-40 w-full max-w-md flex-col items-center justify-center rounded-xl border">
        {phase === 'ready' && (
          <p className="text-base-content/60 text-sm">Press Start to begin</p>
        )}
        {phase === 'fixation' && (
          <span className="text-primary text-4xl font-bold">+</span>
        )}
        {phase === 'stimulus' && (
          <span className="font-mono text-4xl font-bold tracking-widest">
            {flankerString(def.target, def.congruency)}
          </span>
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

      {/* Controls */}
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
            ← Left
          </button>
          <button
            type="button"
            onClick={() => respond('right')}
            className="btn btn-outline btn-lg">
            Right →
          </button>
        </div>
      )}
      {(phase === 'fixation' || phase === 'feedback') && (
        <div className="flex gap-4 opacity-30">
          <button type="button" disabled className="btn btn-outline btn-lg">
            ← Left
          </button>
          <button type="button" disabled className="btn btn-outline btn-lg">
            Right →
          </button>
        </div>
      )}
      <p className="text-base-content/40 text-xs">Keyboard: ← → arrow keys</p>
    </div>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────────

const FlankerTaskPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Flanker Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Respond to the <strong>central arrow</strong> direction while ignoring the
      flanking arrows. The DDM explains the congruency effect as a change in
      drift rate — incongruent flankers reduce evidence quality.
    </p>
    <FlankerGame />
  </div>
);

export default FlankerTaskPage;
