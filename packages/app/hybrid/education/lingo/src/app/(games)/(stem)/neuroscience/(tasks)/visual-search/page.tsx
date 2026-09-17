'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Target {
  x: number;
  y: number;
  isTarget: boolean;
  color: string;
  shape: 'circle' | 'square';
}
interface Trial {
  targets: Target[];
  setSize: number;
  rt: number | null;
  correct: boolean;
  targetPresent: boolean;
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

const SearchCanvas: FC<{
  trial: Omit<Trial, 'rt' | 'correct'> | null;
  onFound: (found: boolean) => void;
  active: boolean;
}> = ({ trial, onFound, active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trial) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    trial.targets.forEach((item) => {
      ctx.fillStyle = item.color;
      ctx.strokeStyle = item.isTarget ? 'hsl(var(--p))' : 'transparent';
      ctx.lineWidth = 3;
      if (item.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(item.x, item.y, 14, 0, 2 * Math.PI);
        ctx.fill();
        if (item.isTarget) ctx.stroke();
      } else {
        ctx.fillRect(item.x - 13, item.y - 13, 26, 26);
        if (item.isTarget) ctx.strokeRect(item.x - 13, item.y - 13, 26, 26);
      }
    });
  }, [trial]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!active || !trial) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Scale from display size to canvas size
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    const cx = x * scaleX;
    const cy = y * scaleY;

    // Check if clicked on target
    const hit = trial.targets.some((item) => {
      const dx = item.x - cx;
      const dy = item.y - cy;
      return item.isTarget && Math.sqrt(dx * dx + dy * dy) < 20;
    });
    onFound(hit);
  };

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={320}
      onClick={handleClick}
      className={`border-base-content/10 bg-base-200/30 w-full max-w-md rounded-xl border ${active ? 'cursor-crosshair' : 'cursor-default'}`}
    />
  );
};

// ─── Trial generator ──────────────────────────────────────────────────────────

const SET_SIZES = [4, 8, 16];
const DISTRACTORS = ['hsl(220,70%,55%)', 'hsl(140,60%,45%)', 'hsl(30,80%,55%)'];
const TARGET_COLOR = 'hsl(350,80%,55%)';

const randPos = (W: number, H: number, pad = 30): { x: number; y: number } => {
  return {
    x: pad + Math.random() * (W - 2 * pad),
    y: pad + Math.random() * (H - 2 * pad),
  };
};

const buildSearchTrial = (
  setSize: number,
  targetPresent: boolean
): Omit<Trial, 'rt' | 'correct'> => {
  const W = 380;
  const H = 320;
  const items: Target[] = [];
  const nDistractors = targetPresent ? setSize - 1 : setSize;
  for (let i = 0; i < nDistractors; i++) {
    items.push({
      ...randPos(W, H),
      isTarget: false,
      color: DISTRACTORS[i % DISTRACTORS.length],
      shape: 'square',
    });
  }
  if (targetPresent) {
    items.push({
      ...randPos(W, H),
      isTarget: true,
      color: TARGET_COLOR,
      shape: 'circle',
    });
  }
  return { targets: items, setSize, targetPresent };
};

const buildAllTrials = (): Omit<Trial, 'rt' | 'correct'>[] => {
  const trials: Omit<Trial, 'rt' | 'correct'>[] = [];
  SET_SIZES.forEach((n) => {
    for (let i = 0; i < 3; i++) {
      trials.push(buildSearchTrial(n, true));
      trials.push(buildSearchTrial(n, false));
    }
  });
  return trials.sort(() => Math.random() - 0.5);
};

const N_TRIALS = SET_SIZES.length * 6;

// ─── Summary ──────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const bySize = SET_SIZES.map((n) => {
    const ts = trials.filter((t) => t.setSize === n && t.targetPresent);
    const rts = ts
      .filter((t) => t.rt !== null && t.correct)
      .map((t) => t.rt as number);
    const meanRT = rts.length
      ? Math.round(rts.reduce((a, b) => a + b) / rts.length)
      : 0;
    const acc = ts.length
      ? Math.round((ts.filter((t) => t.correct).length / ts.length) * 100)
      : 0;
    return { n, meanRT, acc };
  });
  const overall = Math.round(
    (trials.filter((t) => t.correct).length / trials.length) * 100
  );

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🔍</div>
      <h2 className="text-primary text-2xl font-bold">Results</h2>
      <p className="text-base-content/60 text-sm">
        Overall accuracy: <strong>{overall}%</strong>
      </p>
      <div className="w-full max-w-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-base-content/50 border-base-content/10 border-b">
              <th className="py-2 text-left">Set size</th>
              <th className="py-2 text-right">Accuracy (target present)</th>
              <th className="py-2 text-right">Mean RT</th>
            </tr>
          </thead>
          <tbody>
            {bySize.map(({ n, meanRT, acc }) => (
              <tr key={n} className="border-base-content/5 border-b">
                <td className="py-2 font-mono font-bold">{n} items</td>
                <td
                  className={`py-2 text-right font-bold ${acc >= 80 ? 'text-success' : 'text-warning'}`}>
                  {acc}%
                </td>
                <td className="text-primary py-2 text-right font-mono">
                  {meanRT || '—'} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base-content/60 max-w-md text-center text-sm">
        The <strong>set-size effect</strong>: larger displays slow RT. The DDM
        models search as repeated sampling — more distractors reduce effective
        drift rate by adding noise to evidence accumulation.
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

const VisualSearchGame: FC = () => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [trialDefs] = useState(() => buildAllTrials());
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
          timer.current = setTimeout(() => nextTrial(updated), 700);
        }, 5000);
      }, 500);
    },
    [trialDefs]
  );

  const respond = useCallback(
    (targetFound: boolean) => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimStart.current);
      const def = trialDefs[idx];
      const correct = targetFound === def.targetPresent;
      const t: Trial = { ...def, rt, correct };
      const updated = [...trials, t];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(() => nextTrial(updated), 700);
    },
    [phase, idx, trialDefs, trials, nextTrial]
  );

  const handleCanvasFound = useCallback(
    (found: boolean) => respond(found ? true : false),
    [respond]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') respond(true);
      if (e.key === 'a' || e.key === 'A') respond(false);
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
    <div className="flex flex-col items-center gap-5">
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

      <div className="flex w-full flex-col items-center gap-2">
        {phase === 'ready' && (
          <div className="border-base-content/10 bg-base-200/30 flex h-64 w-full max-w-md items-center justify-center rounded-xl border">
            <p className="text-base-content/40 text-sm">Press Start</p>
          </div>
        )}
        {phase === 'fixation' && (
          <div className="border-base-content/10 bg-base-200/30 flex h-64 w-full max-w-md items-center justify-center rounded-xl border">
            <span className="text-primary text-5xl font-bold">+</span>
          </div>
        )}
        {phase === 'stimulus' && (
          <>
            <p className="text-base-content/50 text-xs">
              Find the{' '}
              <span className="font-bold text-red-500">red circle</span> — click
              it or press P (present) / A (absent)
            </p>
            <SearchCanvas
              trial={def}
              onFound={handleCanvasFound}
              active={true}
            />
          </>
        )}
        {phase === 'feedback' && lastTrial && (
          <div className="border-base-content/10 bg-base-200/30 flex h-64 w-full max-w-md flex-col items-center justify-center gap-2 rounded-xl border">
            <span
              className={`text-5xl font-bold ${lastTrial.correct ? 'text-success' : 'text-error'}`}>
              {lastTrial.correct ? '✓' : '✗'}
            </span>
            {lastTrial.rt !== null && (
              <span className="font-mono text-lg">{lastTrial.rt} ms</span>
            )}
            <span className="text-base-content/40 text-xs">
              Target was {lastTrial.targetPresent ? 'present' : 'absent'}
            </span>
          </div>
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
            className="btn btn-success">
            P — Target Present
          </button>
          <button
            type="button"
            onClick={() => respond(false)}
            className="btn btn-error">
            A — Target Absent
          </button>
        </div>
      )}
      {(phase === 'fixation' || phase === 'feedback') && (
        <div className="flex gap-4 opacity-30">
          <button type="button" disabled className="btn btn-success">
            P — Target Present
          </button>
          <button type="button" disabled className="btn btn-error">
            A — Target Absent
          </button>
        </div>
      )}
      <p className="text-base-content/40 text-xs">
        Keyboard: P = Present · A = Absent · Click = Present
      </p>
    </div>
  );
};

const VisualSearchPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Visual Search Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Find the <strong className="text-red-500">red circle</strong> among
      coloured squares. The DDM explains the <strong>set-size effect</strong>:
      more distractors dilute evidence, reducing drift rate and slowing
      decisions.
    </p>
    <VisualSearchGame />
  </div>
);

export default VisualSearchPage;
