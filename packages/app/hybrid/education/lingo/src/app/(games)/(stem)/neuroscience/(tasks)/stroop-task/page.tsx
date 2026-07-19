'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ────────────────────────────────────────────────────────────────────

type InkColor = 'red' | 'green' | 'blue' | 'yellow';
type Congruency = 'congruent' | 'incongruent';
type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Trial {
  word: string; // the printed word
  inkColor: InkColor; // the ink colour to respond to
  congruency: Congruency;
  rt: number | null;
  correct: boolean;
}

// ─── Stimulus bank ────────────────────────────────────────────────────────────

const COLORS: InkColor[] = ['red', 'green', 'blue', 'yellow'];
const COLOR_WORDS: Record<InkColor, string> = {
  red: 'RED',
  green: 'GREEN',
  blue: 'BLUE',
  yellow: 'YELLOW',
};
const INK_CLASSES: Record<InkColor, string> = {
  red: 'text-red-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-400',
};
const BTN_CLASSES: Record<InkColor, string> = {
  red: 'btn-error',
  green: 'btn-success',
  blue: 'btn-info',
  yellow: 'btn-warning',
};

const buildTrials = (): Omit<Trial, 'rt' | 'correct'>[] => {
  const trials: Omit<Trial, 'rt' | 'correct'>[] = [];
  COLORS.forEach((ink) => {
    // Congruent: word matches ink
    trials.push({
      word: COLOR_WORDS[ink],
      inkColor: ink,
      congruency: 'congruent',
    });
    trials.push({
      word: COLOR_WORDS[ink],
      inkColor: ink,
      congruency: 'congruent',
    });
    // Incongruent: pick a different word
    const others = COLORS.filter((c) => c !== ink);
    const wordColor = others[Math.floor(Math.random() * others.length)];
    trials.push({
      word: COLOR_WORDS[wordColor],
      inkColor: ink,
      congruency: 'incongruent',
    });
    trials.push({
      word: COLOR_WORDS[wordColor],
      inkColor: ink,
      congruency: 'incongruent',
    });
  });
  return trials.sort(() => Math.random() - 0.5);
};

const N_TRIALS = COLORS.length * 4;

// ─── Summary ──────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const cong = trials.filter((t) => t.congruency === 'congruent');
  const incong = trials.filter((t) => t.congruency === 'incongruent');
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
  const stroopEffect = meanRT(incong) - meanRT(cong);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🎨</div>
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
            label: 'Stroop Effect',
            value: `+${stroopEffect} ms`,
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
        The <strong>Stroop effect</strong>: word reading interferes with colour
        naming on incongruent trials, reducing drift rate toward the correct
        colour boundary and increasing both RT and errors.
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

const StroopGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [trialDefs] = useState(() => buildTrials());
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
    (color: InkColor) => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimStart.current);
      const def = trialDefs[idx];
      const t: Trial = { ...def, rt, correct: color === def.inkColor };
      const updated = [...trials, t];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(() => nextTrial(updated), 600);
    },
    [phase, idx, trialDefs, trials, nextTrial]
  );

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
          <span
            className={`font-mono text-5xl font-black tracking-widest ${INK_CLASSES[def.inkColor]}`}>
            {def.word}
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

      <p className="text-base-content/60 text-sm">
        Name the <strong>ink colour</strong> — ignore the word!
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => respond(c)}
              className={`btn ${BTN_CLASSES[c]}`}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      {(phase === 'fixation' || phase === 'feedback') && (
        <div className="grid grid-cols-2 gap-3 opacity-30 sm:grid-cols-4">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              disabled
              className={`btn ${BTN_CLASSES[c]}`}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const StroopTaskPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Stroop Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Name the <strong>ink colour</strong> of each word as fast as possible —
      ignoring the word itself. The <strong>Stroop effect</strong>: incongruent
      colour words slow responses by reducing the drift rate toward the correct
      colour response.
    </p>
    <StroopGame />
  </div>
);

export default StroopTaskPage;
