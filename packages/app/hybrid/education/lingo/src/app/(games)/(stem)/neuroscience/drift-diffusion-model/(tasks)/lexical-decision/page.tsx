'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Word bank ───────────────────────────────────────────────────────────────

const WORDS = [
  'apple',
  'table',
  'chair',
  'stone',
  'bread',
  'green',
  'plant',
  'light',
  'river',
  'music',
  'cloud',
  'flame',
  'judge',
  'tiger',
  'dance',
  'frame',
  'brain',
  'space',
  'coral',
  'grain',
];

const NON_WORDS = [
  'flurb',
  'mivon',
  'zarpt',
  'queld',
  'blorf',
  'trand',
  'speck',
  'wumph',
  'glosk',
  'prend',
  'clurb',
  'snorf',
  'tripe',
  'blant',
  'yumph',
  'creld',
  'glurb',
  'zomft',
  'sneld',
  'prunk',
];

type Stimulus = { string: string; isWord: boolean };
type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Trial {
  stimulus: Stimulus;
  rt: number | null;
  correct: boolean;
}

const N_TRIALS = 20;

const buildTrials = (): Stimulus[] => {
  const half = N_TRIALS / 2;
  const words = WORDS.slice(0, half).map((w) => ({ string: w, isWord: true }));
  const nws = NON_WORDS.slice(0, half).map((w) => ({
    string: w,
    isWord: false,
  }));
  return [...words, ...nws].sort(() => Math.random() - 0.5);
};

// ─── Summary ─────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const words = trials.filter((t) => t.stimulus.isWord);
  const nonwords = trials.filter((t) => !t.stimulus.isWord);
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
  const lexEffect = meanRT(nonwords) - meanRT(words);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">📖</div>
      <h2 className="text-primary text-2xl font-bold">Results</h2>
      <div className="grid w-full max-w-lg grid-cols-2 gap-3">
        {[
          {
            label: 'Word RT',
            value: `${meanRT(words)} ms`,
            cls: 'text-success',
          },
          {
            label: 'Non-word RT',
            value: `${meanRT(nonwords)} ms`,
            cls: 'text-warning',
          },
          { label: 'Word Acc.', value: `${acc(words)}%`, cls: 'text-success' },
          {
            label: 'Non-word Acc.',
            value: `${acc(nonwords)}%`,
            cls: 'text-warning',
          },
          {
            label: 'Lexicality Effect',
            value: `+${lexEffect} ms`,
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
        Real words are recognised faster than non-words (lexicality effect). The
        DDM captures this as a higher drift rate for high-frequency words —
        stronger evidence accumulation toward the "word" boundary.
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

const LexicalDecisionGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [stimuli] = useState(() => buildTrials());
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
            stimulus: stimuli[done.length],
            rt: null,
            correct: false,
          };
          const updated = [...done, miss];
          setTrials(updated);
          setPhase('feedback');
          timer.current = setTimeout(() => nextTrial(updated), 600);
        }, 2000);
      }, 500);
    },
    [stimuli]
  );

  const respond = useCallback(
    (isWord: boolean) => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimStart.current);
      const trial: Trial = {
        stimulus: stimuli[idx],
        rt,
        correct: isWord === stimuli[idx].isWord,
      };
      const updated = [...trials, trial];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(() => nextTrial(updated), 600);
    },
    [phase, idx, stimuli, trials, nextTrial]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') respond(true);
      if (e.key === 'j' || e.key === 'J') respond(false);
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
          <span className="font-mono text-4xl font-bold tracking-widest uppercase">
            {stimuli[idx].string}
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
            onClick={() => respond(true)}
            className="btn btn-success btn-lg">
            F — Word
          </button>
          <button
            type="button"
            onClick={() => respond(false)}
            className="btn btn-error btn-lg">
            J — Non-word
          </button>
        </div>
      )}
      {(phase === 'fixation' || phase === 'feedback') && (
        <div className="flex gap-4 opacity-30">
          <button type="button" disabled className="btn btn-success btn-lg">
            F — Word
          </button>
          <button type="button" disabled className="btn btn-error btn-lg">
            J — Non-word
          </button>
        </div>
      )}
      <p className="text-base-content/40 text-xs">
        Keyboard: F = Word · J = Non-word
      </p>
    </div>
  );
};

const LexicalDecisionPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Lexical Decision Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Decide as fast as possible whether each string is a{' '}
      <strong>real English word</strong> or a <strong>non-word</strong>. The DDM
      models this as drift rate differences: real words have faster evidence
      accumulation toward the word boundary.
    </p>
    <LexicalDecisionGame />
  </div>
);

export default LexicalDecisionPage;
