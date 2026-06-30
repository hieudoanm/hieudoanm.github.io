import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { createSignal, createEffect, onCleanup } from 'solid-js';

type Preset = { label: string; work: number; break: number };
type Phase = 'work' | 'break';

const PRESETS: Preset[] = [
  { label: '25 / 5', work: 25, break: 5 },
  { label: '50 / 10', work: 50, break: 10 },
  { label: '90 / 20', work: 90, break: 20 },
];

const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

export const PomodoroModal = ({ onClose }: { onClose: () => void }) => {
  const [preset, setPreset] = createSignal<Preset>(PRESETS[1]);
  const [phase, setPhase] = createSignal<Phase>('work');
  const [remaining, setRemaining] = createSignal(PRESETS[1].work * 60);
  const [running, setRunning] = createSignal(false);
  const [round, setRound] = createSignal(1);
  let intervalRef: ReturnType<typeof setInterval> | undefined;
  let audioCtxRef: AudioContext | undefined;

  const total = () =>
    phase() === 'work' ? preset().work * 60 : preset().break * 60;
  const progress = () => 1 - remaining() / total();
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = () => circumference * (1 - progress());

  const beep = () => {
    try {
      if (!audioCtxRef) audioCtxRef = new AudioContext();
      const ctx = audioCtxRef;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = phase() === 'work' ? 880 : 440;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {}
  };

  const applyPreset = (p: Preset) => {
    setPreset(p);
    setPhase('work');
    setRemaining(p.work * 60);
    setRunning(false);
    setRound(1);
  };

  const togglePhase = () => {
    const next: Phase = phase() === 'work' ? 'break' : 'work';
    setPhase(next);
    setRemaining((next === 'work' ? preset().work : preset().break) * 60);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(total());
    setRunning(false);
  };

  createEffect(() => {
    if (!running()) {
      if (intervalRef) clearInterval(intervalRef);
      return;
    }
    intervalRef = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          beep();
          setPhase((p) => {
            const next: Phase = p === 'work' ? 'break' : 'work';
            if (next === 'work') setRound((r) => r + 1);
            setRemaining(
              (next === 'work' ? preset().work : preset().break) * 60
            );
            return next;
          });
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    onCleanup(() => {
      if (intervalRef) clearInterval(intervalRef);
    });
  });

  createEffect(() => {
    const original = document.title;
    if (running()) document.title = `${fmt(remaining())} — ${phase()}`;
    onCleanup(() => {
      document.title = original;
    });
  });

  const isWork = () => phase() === 'work';

  return (
    <ModalWrapper onClose={onClose} title="Pomodoro">
      <p class="text-base-content/50 mb-2 text-sm">
        Round {round()} · {isWork() ? 'Focus' : 'Break'} phase
      </p>

      <div class="grid grid-cols-3 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            class={`btn btn-sm ${
              preset().label === p.label ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => applyPreset(p)}>
            {p.label}
          </button>
        ))}
      </div>

      <div class="flex flex-col items-center gap-4">
        <div class="relative flex items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="8"
              class="stroke-base-300"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              class={isWork() ? 'stroke-primary' : 'stroke-success'}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset()}
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' } as any}
            />
          </svg>
          <div class="absolute flex flex-col items-center">
            <span class="font-mono text-3xl font-bold tabular-nums">
              {fmt(remaining())}
            </span>
            <span
              class={`text-xs font-medium tracking-widest uppercase ${isWork() ? 'text-primary' : 'text-success'}`}>
              {isWork() ? 'focus' : 'break'}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="btn btn-ghost btn-sm btn-circle"
            onClick={reset}
            title="Reset">
            ↺
          </button>
          <button
            class={`btn btn-lg btn-circle ${running() ? 'btn-error' : 'btn-primary'}`}
            onClick={() => setRunning((r) => !r)}>
            {running() ? '⏸' : '▶'}
          </button>
          <button
            class="btn btn-ghost btn-sm btn-circle"
            onClick={togglePhase}
            title={isWork() ? 'Skip to break' : 'Skip to focus'}>
            ⏭
          </button>
        </div>
      </div>

      <div class="flex justify-center gap-2">
        <span
          class={`badge badge-sm ${isWork() ? 'badge-primary' : 'badge-ghost'}`}>
          Focus {preset().work}m
        </span>
        <span
          class={`badge badge-sm ${!isWork() ? 'badge-success' : 'badge-ghost'}`}>
          Break {preset().break}m
        </span>
      </div>
    </ModalWrapper>
  );
};
