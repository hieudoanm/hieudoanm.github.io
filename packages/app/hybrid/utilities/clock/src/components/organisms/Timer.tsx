'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { TimerPreset, TIMER_PRESETS, fmtTimer } from '@/lib/timer';

export const Timer: FC = () => {
  const [preset, setPreset] = useState<TimerPreset>(TIMER_PRESETS[1]);
  const [remaining, setRemaining] = useState(TIMER_PRESETS[1].seconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const total = preset.seconds;
  const progress = 1 - remaining / total;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const beep = () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e: unknown) {
      console.error('Audio playback error:', e);
    }
  };

  const applyPreset = (p: TimerPreset) => {
    setPreset(p);
    setRemaining(p.seconds);
    setRunning(false);
    setFinished(false);
  };

  const reset = () => {
    setRemaining(total);
    setRunning(false);
    setFinished(false);
  };

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          beep();
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    const original = document.title;
    if (running) document.title = `${fmtTimer(remaining)} — Timer`;
    return () => {
      document.title = original;
    };
  }, [running, remaining]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {TIMER_PRESETS.map((p) => (
          <button
            key={p.label}
            className={`btn btn-sm ${
              preset.label === p.label ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => applyPreset(p)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="8"
              className="stroke-base-300"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={finished ? 'stroke-success' : 'stroke-primary'}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-3xl font-normal tabular-nums">
              {fmtTimer(remaining)}
            </span>
            <span className="text-primary text-xs font-normal tracking-widest uppercase">
              {finished ? 'done' : 'remaining'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={reset}
            title="Reset">
            ↺
          </button>
          <button
            className={`btn btn-lg btn-circle ${running ? 'btn-error' : 'btn-primary'}`}
            onClick={() => {
              if (finished) {
                reset();
              } else {
                setRunning((r) => !r);
              }
            }}>
            {running ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <span className="badge badge-primary badge-sm">{preset.label}</span>
      </div>
    </div>
  );
};
Timer.displayName = 'Timer';
