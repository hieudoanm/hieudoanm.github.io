'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = 'left' | 'right';
type Phase = 'ready' | 'fixation' | 'stimulus' | 'feedback' | 'done';

interface Trial {
  direction: Direction;
  coherence: number; // 0–1
  rt: number | null;
  correct: boolean;
}

// ─── Canvas – Random Dot Motion ───────────────────────────────────────────────

const DOT_COUNT = 100;
const DOT_RADIUS = 2.5;
const DOT_SPEED = 3;

interface Dot {
  x: number;
  y: number;
  coherent: boolean;
}

const RDMCanvas: FC<{
  direction: Direction;
  coherence: number;
  active: boolean;
}> = ({ direction, coherence, active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) / 2 - 6;

    // Initialise dots
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.random() * R;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        coherent: Math.random() < coherence,
      };
    });

    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Circular aperture clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.clip();

      // Move dots
      dotsRef.current.forEach((dot) => {
        if (dot.coherent) {
          dot.x += direction === 'right' ? DOT_SPEED : -DOT_SPEED;
        } else {
          dot.x += (Math.random() - 0.5) * DOT_SPEED * 2;
          dot.y += (Math.random() - 0.5) * DOT_SPEED * 2;
        }

        // Wrap inside circle
        const dx = dot.x - cx;
        const dy = dot.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) > R) {
          const angle = Math.random() * 2 * Math.PI;
          dot.x = cx + R * 0.95 * Math.cos(angle + Math.PI);
          dot.y = cy + R * 0.95 * Math.sin(angle + Math.PI);
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = 'hsl(var(--p))';
        ctx.fill();
      });

      ctx.restore();

      // Aperture outline
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.strokeStyle = 'hsl(var(--bc)/0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (active) rafRef.current = requestAnimationFrame(draw);
    };

    if (active) draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, coherence, active]);

  return (
    <canvas ref={canvasRef} width={280} height={280} className="rounded-full" />
  );
};

// ─── Coherence levels ──────────────────────────────────────────────────────────

const COHERENCE_LEVELS = [0.08, 0.16, 0.32, 0.64];

const buildTrials = (): Omit<Trial, 'rt' | 'correct'>[] => {
  const dirs: Direction[] = ['left', 'right'];
  const trials: Omit<Trial, 'rt' | 'correct'>[] = [];
  COHERENCE_LEVELS.forEach((coherence) => {
    dirs.forEach((direction) => {
      trials.push({ direction, coherence });
      trials.push({ direction, coherence });
    });
  });
  return trials.sort(() => Math.random() - 0.5);
};

const N_TRIALS = COHERENCE_LEVELS.length * 4;

// ─── Summary ──────────────────────────────────────────────────────────────────

const Summary: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const byCoherence = COHERENCE_LEVELS.map((coh) => {
    const ts = trials.filter((t) => t.coherence === coh);
    const rts = ts
      .filter((t) => t.rt !== null && t.correct)
      .map((t) => t.rt as number);
    const meanRT = rts.length
      ? Math.round(rts.reduce((a, b) => a + b) / rts.length)
      : 0;
    const acc = ts.length
      ? Math.round((ts.filter((t) => t.correct).length / ts.length) * 100)
      : 0;
    return { coh: Math.round(coh * 100), meanRT, acc };
  });

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-5xl">🟣</div>
      <h2 className="text-primary text-2xl font-bold">Results</h2>
      <div className="w-full max-w-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-base-content/50 border-base-content/10 border-b">
              <th className="py-2 text-left">Coherence</th>
              <th className="py-2 text-right">Accuracy</th>
              <th className="py-2 text-right">Mean RT (correct)</th>
            </tr>
          </thead>
          <tbody>
            {byCoherence.map(({ coh, meanRT, acc }) => (
              <tr key={coh} className="border-base-content/5 border-b">
                <td className="py-2 font-mono font-bold">{coh}%</td>
                <td
                  className={`py-2 text-right font-bold ${acc >= 80 ? 'text-success' : acc >= 60 ? 'text-warning' : 'text-error'}`}>
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
        Higher coherence → faster, more accurate responses. The DDM captures
        this as a linear scaling of drift rate with motion coherence.
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

const RandomDotMotionGame: FC = () => {
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
          timer.current = setTimeout(() => nextTrial(updated), 700);
        }, 3000);
      }, 500);
    },
    [trialDefs]
  );

  const respond = useCallback(
    (dir: Direction) => {
      if (phase !== 'stimulus') return;
      clearTimer();
      const rt = Math.round(performance.now() - stimStart.current);
      const def = trialDefs[idx];
      const t: Trial = { ...def, rt, correct: dir === def.direction };
      const updated = [...trials, t];
      setTrials(updated);
      setPhase('feedback');
      timer.current = setTimeout(() => nextTrial(updated), 700);
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

      <div className="flex flex-col items-center gap-2">
        {phase === 'ready' && (
          <div className="text-base-content/40 border-base-content/10 flex h-[280px] w-[280px] items-center justify-center rounded-full border text-sm">
            Press Start
          </div>
        )}
        {phase === 'fixation' && (
          <div className="border-base-content/10 flex h-[280px] w-[280px] items-center justify-center rounded-full border">
            <span className="text-primary text-5xl font-bold">+</span>
          </div>
        )}
        {phase === 'stimulus' && (
          <RDMCanvas
            direction={def.direction}
            coherence={def.coherence}
            active={true}
          />
        )}
        {phase === 'feedback' && lastTrial && (
          <div className="border-base-content/10 flex h-[280px] w-[280px] flex-col items-center justify-center gap-2 rounded-full border">
            <span
              className={`text-5xl font-bold ${lastTrial.correct ? 'text-success' : 'text-error'}`}>
              {lastTrial.correct ? '✓' : '✗'}
            </span>
            {lastTrial.rt !== null && (
              <span className="font-mono text-lg">{lastTrial.rt} ms</span>
            )}
          </div>
        )}
        {phase === 'stimulus' && (
          <span className="text-base-content/30 text-xs">
            Coherence: {Math.round(def.coherence * 100)}%
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

const RandomDotMotionPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/neuroscience/drift-diffusion-model"
      className="text-primary text-sm hover:underline">
      ← Back to DDM Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Random Dot Motion Task
    </h1>
    <p className="text-base-content/60 text-sm">
      Judge the <strong>net direction of motion</strong> of a field of dots —
      some move coherently, others randomly. Higher coherence = easier. The DDM
      maps coherence directly to drift rate.
    </p>
    <RandomDotMotionGame />
  </div>
);

export default RandomDotMotionPage;
