import { createSignal, createEffect, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

interface TimeUnit {
  value: number;
  label: string;
}

function getElapsed(startTime: number): TimeUnit[] {
  let totalSeconds = Math.floor((Date.now() - startTime) / 1000);

  const years = Math.floor(totalSeconds / (365 * 24 * 3600));
  totalSeconds -= years * 365 * 24 * 3600;

  const months = Math.floor(totalSeconds / (30 * 24 * 3600));
  totalSeconds -= months * 30 * 24 * 3600;

  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds -= days * 24 * 3600;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return [
    { value: years, label: years === 1 ? 'year' : 'years' },
    { value: months, label: months === 1 ? 'month' : 'months' },
    { value: days, label: days === 1 ? 'day' : 'days' },
    { value: hours, label: hours === 1 ? 'hour' : 'hours' },
    { value: minutes, label: minutes === 1 ? 'minute' : 'minutes' },
    { value: seconds, label: seconds === 1 ? 'second' : 'seconds' },
  ];
}

export const NoSleepModal = (props: { onClose: () => void }) => {
  const startTime = Date.now();
  const [units, setUnits] = createSignal<TimeUnit[]>(getElapsed(startTime));
  let wakeLockRef: WakeLockSentinel | null = null;

  createEffect(() => {
    const acquire = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef = await navigator.wakeLock.request('screen');
        } catch {
          // silently fail if permission denied
        }
      }
    };

    acquire();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') acquire();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    onCleanup(() => {
      document.removeEventListener('visibilitychange', handleVisibility);
      wakeLockRef?.release();
    });
  });

  createEffect(() => {
    const id = setInterval(() => {
      setUnits(getElapsed(startTime));
    }, 1000);
    onCleanup(() => clearInterval(id));
  });

  const visible = () => units().filter((u) => u.value > 0);

  return (
    <ModalWrapper onClose={props.onClose} title="No Sleep" size="max-w-2xl">
      <div class="flex flex-col items-center justify-center gap-12 py-8">
        <p
          class="text-base-content/50 text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace" } as any}>
          Have not slept for
        </p>

        <div class="flex flex-wrap items-end justify-center gap-x-8 gap-y-6">
          {visible().length === 0 ? (
            <div class="flex flex-col items-center gap-1">
              <span class="text-primary text-6xl leading-none font-black tabular-nums md:text-8xl">
                00
              </span>
              <span class="text-base-content/40 text-xs font-semibold tracking-[0.25em] uppercase">
                seconds
              </span>
            </div>
          ) : (
            visible().map((u) => (
              <div key={u.label} class="flex flex-col items-center gap-1">
                <span class="text-primary text-6xl leading-none font-black tabular-nums md:text-8xl">
                  {u.value.toString().padStart(2, '0')}
                </span>
                <span class="text-base-content/40 text-xs font-semibold tracking-[0.25em] uppercase">
                  {u.label}
                </span>
              </div>
            ))
          )}
        </div>

        <div class="bg-primary/30 h-px w-24" />

        <p class="text-base-content/20 text-xs tracking-widest uppercase">
          Screen kept awake
        </p>
      </div>
    </ModalWrapper>
  );
};
