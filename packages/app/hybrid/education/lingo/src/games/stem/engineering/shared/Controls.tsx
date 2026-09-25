'use client';

import type { FC, ReactNode } from 'react';
import type { PlayerApi } from './usePlayer';

/**
 * Layout and control primitives shared by the engineering simulators.
 *
 * These carry no domain logic, so they sit above the individual games rather
 * than being copied into eighteen folders.
 */

export const Panel: FC<{
  title: string;
  hint?: string;
  children: ReactNode;
}> = ({ title, hint, children }) => (
  <section className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex flex-col gap-1">
      <h3 className="text-primary text-sm font-bold">{title}</h3>
      {hint && <p className="text-base-content/50 text-xs">{hint}</p>}
    </div>
    {children}
  </section>
);

export const Stat: FC<{
  label: string;
  value: string;
  tone?: 'default' | 'good' | 'warn';
  testId?: string;
}> = ({ label, value, tone = 'default', testId }) => {
  const toneClass =
    tone === 'good'
      ? 'text-success'
      : tone === 'warn'
        ? 'text-warning'
        : 'text-primary';
  return (
    <div
      className="border-base-content/10 bg-base-200/30 flex flex-col items-center gap-1 rounded-lg border px-4 py-3"
      data-testid={testId}>
      <span className={`font-mono text-xl font-bold ${toneClass}`}>
        {value}
      </span>
      <span className="text-base-content/50 text-xs">{label}</span>
    </div>
  );
};

export const StatRow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{children}</div>
);

export const Slider: FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, suffix = '', onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <label className="text-base-content/70 text-xs font-medium">
        {label}
      </label>
      <span className="text-primary font-mono text-xs font-bold">
        {value}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-xs"
    />
  </div>
);

export const NumberInput: FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}> = ({ label, value, placeholder, onChange }) => (
  <label className="flex flex-col gap-1">
    <span className="text-base-content/70 text-xs font-medium">{label}</span>
    <input
      type="text"
      aria-label={label}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="input input-sm input-bordered w-full font-mono"
    />
  </label>
);

/** Transport controls for stepping through a recorded run. */
export const PlaybackControls: FC<{
  player: PlayerApi;
  speedMs: number;
  onSpeed: (n: number) => void;
}> = ({ player, speedMs, onSpeed }) => (
  <div className="flex flex-wrap items-center gap-2" data-testid="playback">
    <button
      className="btn btn-primary btn-sm"
      onClick={player.toggle}
      disabled={player.total === 0}>
      {player.isPlaying ? 'Pause' : 'Play'}
    </button>
    <button
      className="btn btn-sm"
      onClick={player.back}
      disabled={player.index === 0}>
      Back
    </button>
    <button
      className="btn btn-sm"
      onClick={player.forward}
      disabled={player.isFinished}>
      Step
    </button>
    <button className="btn btn-sm" onClick={player.reset}>
      Reset
    </button>
    <input
      type="range"
      aria-label="Step speed"
      min={10}
      max={600}
      step={10}
      value={620 - speedMs}
      onChange={(e) => onSpeed(620 - Number(e.target.value))}
      className="range range-primary range-xs ml-auto w-32"
    />
    <span className="text-base-content/50 font-mono text-xs">
      {player.index + 1} / {player.total}
    </span>
  </div>
);
