import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useEffect, useRef, useState } from 'react';
import { Preset, Phase, PRESETS, fmt } from './utils';

export const PomodoroModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [preset, setPreset] = useState<Preset>(PRESETS[1]); // 50/10 default
  const [phase, setPhase] = useState<Phase>('work');
  const [remaining, setRemaining] = useState(PRESETS[1].work * 60);
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const total = phase === 'work' ? preset.work * 60 : preset.break * 60;
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
      osc.frequency.value = phase === 'work' ? 880 : 440;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e: unknown) {
      console.error('Audio playback error:', e);
    }
  };

  const applyPreset = (p: Preset) => {
    setPreset(p);
    setPhase('work');
    setRemaining(p.work * 60);
    setRunning(false);
    setRound(1);
  };

  const togglePhase = () => {
    const next: Phase = phase === 'work' ? 'break' : 'work';
    setPhase(next);
    setRemaining((next === 'work' ? preset.work : preset.break) * 60);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(total);
    setRunning(false);
  };

  // tick
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          beep();
          // auto-advance phase
          setPhase((p) => {
            const next: Phase = p === 'work' ? 'break' : 'work';
            if (next === 'work') setRound((r) => r + 1);
            setRemaining((next === 'work' ? preset.work : preset.break) * 60);
            return next;
          });
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, preset]);

  // update title
  useEffect(() => {
    const original = document.title;
    if (running) document.title = `${fmt(remaining)} — ${phase}`;
    return () => {
      document.title = original;
    };
  }, [running, remaining, phase]);

  const isWork = phase === 'work';

  return (
    <ModalWrapper onClose={onClose} title="Pomodoro">
      <p className="text-base-content/50 mb-2 text-sm">
        Round {round} · {isWork ? 'Focus' : 'Break'} phase
      </p>

      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((p) => (
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
              className={isWork ? 'stroke-primary' : 'stroke-success'}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-3xl font-bold tabular-nums">
              {fmt(remaining)}
            </span>
            <span
              className={`text-xs font-medium tracking-widest uppercase ${isWork ? 'text-primary' : 'text-success'}`}>
              {isWork ? 'focus' : 'break'}
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
            onClick={() => setRunning((r) => !r)}>
            {running ? '⏸' : '▶'}
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={togglePhase}
            title={isWork ? 'Skip to break' : 'Skip to focus'}>
            ⏭
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <span
          className={`badge badge-sm ${isWork ? 'badge-primary' : 'badge-ghost'}`}>
          Focus {preset.work}m
        </span>
        <span
          className={`badge badge-sm ${!isWork ? 'badge-success' : 'badge-ghost'}`}>
          Break {preset.break}m
        </span>
      </div>
    </ModalWrapper>
  );
};
PomodoroModal.displayName = 'PomodoroModal';
