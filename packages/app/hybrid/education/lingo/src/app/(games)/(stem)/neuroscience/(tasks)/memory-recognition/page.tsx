'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ────────────────────────────────────────────────────────────────────

type ItemType = 'studied' | 'new';
type Phase =
  'study' | 'test-ready' | 'fixation' | 'probe' | 'feedback' | 'done';

interface TestTrial {
  word: string;
  type: ItemType;
  rt: number | null;
  correct: boolean;
}

// ─── Word bank ────────────────────────────────────────────────────────────────

const STUDY_WORDS = [
  'ocean',
  'piano',
  'tower',
  'flame',
  'lunar',
  'storm',
  'ridge',
  'pearl',
  'drift',
  'cloak',
];
const LURE_WORDS = [
  'ember',
  'prism',
  'glyph',
  'quill',
  'froth',
  'chalk',
  'crest',
  'flint',
  'latch',
  'swamp',
];
const STUDY_TIME_MS = 3000;
const N_TEST = 20;

// ─── Summary ──────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: TestTrial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const hits = trials.filter((t) => t.type === 'studied' && t.correct);
  const fas = trials.filter((t) => t.type === 'new' && !t.correct);
  const cr = trials.filter((t) => t.type === 'new' && t.correct);
  const studied = trials.filter((t) => t.type === 'studied');
  const newT = trials.filter((t) => t.type === 'new');
  const meanRT = (ts: TestTrial[]) => {
    const rts = ts.filter((t) => t.rt !== null).map((t) => t.rt as number);
    return rts.length
      ? Math.round(rts.reduce((a, b) => a + b) / rts.length)
      : 0;
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🧩</div>
      <h2 className="text-primary text-2xl font-bold">Memory Results</h2>
      <div className="grid w-full max-w-lg grid-cols-2 gap-3">
        {[
          {
            label: 'Hit rate',
            value: `${Math.round((hits.length / (studied.length || 1)) * 100)}%`,
            cls: 'text-success',
          },
          {
            label: 'False alarm rate',
            value: `${Math.round((fas.length / (newT.length || 1)) * 100)}%`,
            cls: 'text-error',
          },
          { label: 'Hit RT', value: `${meanRT(hits)} ms`, cls: 'text-success' },
          {
            label: 'Correct rejection RT',
            value: `${meanRT(cr)} ms`,
            cls: 'text-warning',
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
        The DDM models recognition as evidence accumulation: studied items
        produce faster evidence toward "Old" (higher drift rate). Hits are
        faster than correct rejections because memory familiarity boosts drift.
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

const MemoryRecognitionGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('study');
  const [studyIdx, setStudyIdx] = useState(0);
  const [testTrials] = useState<Omit<TestTrial, 'rt' | 'correct'>[]>(() =>
    [
      ...STUDY_WORDS.map((w) => ({ word: w, type: 'studied' as ItemType })),
      ...LURE_WORDS.map((w) => ({ word: w, type: 'new' as ItemType })),
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, N_TEST)
  );
  const [trialIdx, setTrialIdx] = useState(0);
  const [trials, setTrials] = useState<TestTrial[]>([]);
  const stimStart = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Study phase: show words one by one
  useEffect(() => {
    if (phase !== 'study') return;
    if (studyIdx >= STUDY_WORDS.length) {
      setPhase('test-ready');
      return;
    }
    timer.current = setTimeout(() => setStudyIdx((i) => i + 1), STUDY_TIME_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phase, studyIdx]);

  const startTest = () => {
    setPhase('fixation');
    startNextProbe(0, []);
  };

  const startNextProbe = useCallback(
    (next: number, done: TestTrial[]) => {
      if (next >= N_TEST) {
        setTrialIdx(next);
        setPhase('done');
        return;
      }
      setTrialIdx(next);
      setPhase('fixation');
      timer.current = setTimeout(() => {
        stimStart.current = performance.now();
        setPhase('probe');
        timer.current = setTimeout(() => {
          const miss: TestTrial = {
            ...testTrials[next],
            rt: null,
            correct: false,
          };
          const updated = [...done, miss];
          setTrials(updated);
          setPhase('feedback');
          timer.current = setTimeout(
            () => startNextProbe(next + 1, updated),
            600
          );
        }, 2500);
      }, 500);
    },
    [testTrials]
  );

  const respond = useCallback(
    (isOld: boolean) => {
      if (phase !== 'probe') return;
      if (timer.current) clearTimeout(timer.current);
      const rt = Math.round(performance.now() - stimStart.current);
      const def = testTrials[trialIdx];
      const correct = isOld === (def.type === 'studied');
      const t: TestTrial = { ...def, rt, correct };
      const updated = [...trials, t];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(
        () => startNextProbe(trialIdx + 1, updated),
        600
      );
    },
    [phase, trialIdx, testTrials, trials, startNextProbe]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'o' || e.key === 'O') respond(true);
      if (e.key === 'n' || e.key === 'N') respond(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [respond]);

  if (phase === 'done')
    return (
      <Summary
        trials={trials}
        onReset={() => {
          setTrials([]);
          setStudyIdx(0);
          setTrialIdx(0);
          setPhase('study');
        }}
      />
    );

  const lastTrial = trials[trials.length - 1];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Study phase */}
      {(phase === 'study' || phase === 'test-ready') && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-base-content/60 text-sm font-medium tracking-wider uppercase">
            {phase === 'study'
              ? `Study word ${studyIdx + 1} / ${STUDY_WORDS.length}`
              : 'Study phase complete'}
          </p>
          <div className="border-base-content/10 bg-base-200/30 flex h-40 w-full max-w-md items-center justify-center rounded-xl border">
            {phase === 'study' && studyIdx < STUDY_WORDS.length && (
              <span className="font-mono text-4xl font-bold uppercase">
                {STUDY_WORDS[studyIdx]}
              </span>
            )}
            {phase === 'test-ready' && (
              <p className="text-base-content/60 px-6 text-center text-sm">
                Memorised {STUDY_WORDS.length} words. Now you'll see {N_TEST}{' '}
                words — some old, some new.
              </p>
            )}
          </div>
          {phase === 'test-ready' && (
            <button
              type="button"
              onClick={startTest}
              className="btn btn-primary">
              Start Recognition Test
            </button>
          )}
        </div>
      )}

      {/* Test phase */}
      {(phase === 'fixation' || phase === 'probe' || phase === 'feedback') && (
        <>
          <div className="flex w-full items-center gap-2">
            <div className="bg-base-300 h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(trials.length / N_TEST) * 100}%` }}
              />
            </div>
            <span className="text-base-content/50 text-xs whitespace-nowrap">
              {trials.length}/{N_TEST}
            </span>
          </div>
          <div className="border-base-content/10 bg-base-200/30 flex h-40 w-full max-w-md flex-col items-center justify-center rounded-xl border">
            {phase === 'fixation' && (
              <span className="text-primary text-4xl font-bold">+</span>
            )}
            {phase === 'probe' && (
              <span className="font-mono text-4xl font-bold uppercase">
                {testTrials[trialIdx]?.word}
              </span>
            )}
            {phase === 'feedback' && lastTrial && (
              <span
                className={`text-4xl font-bold ${lastTrial.correct ? 'text-success' : 'text-error'}`}>
                {lastTrial.correct ? '✓' : '✗'}
                {lastTrial.rt !== null && (
                  <span className="ml-3 font-mono text-xl">
                    {lastTrial.rt} ms
                  </span>
                )}
              </span>
            )}
          </div>
          {phase === 'probe' && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => respond(true)}
                className="btn btn-success btn-lg">
                O — Old
              </button>
              <button
                type="button"
                onClick={() => respond(false)}
                className="btn btn-error btn-lg">
                N — New
              </button>
            </div>
          )}
          {(phase === 'fixation' || phase === 'feedback') && (
            <div className="flex gap-4 opacity-30">
              <button type="button" disabled className="btn btn-success btn-lg">
                O — Old
              </button>
              <button type="button" disabled className="btn btn-error btn-lg">
                N — New
              </button>
            </div>
          )}
          <p className="text-base-content/40 text-xs">
            Keyboard: O = Old · N = New
          </p>
        </>
      )}
    </div>
  );
};

const MemoryRecognitionPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Memory Recognition Task
    </h1>
    <p className="text-base-content/60 text-sm">
      First <strong>study a list of words</strong>, then judge each probe as{' '}
      <strong>Old</strong> (studied) or <strong>New</strong>. The DDM models
      familiarity-driven evidence accumulation: higher drift rate for previously
      seen items.
    </p>
    <MemoryRecognitionGame />
  </div>
);

export default MemoryRecognitionPage;
