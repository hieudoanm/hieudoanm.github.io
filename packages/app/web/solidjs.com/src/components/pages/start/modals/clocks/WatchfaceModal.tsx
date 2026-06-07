import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { createSignal, onMount, onCleanup } from 'solid-js';

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

const useClock = () => {
  const [state, setState] = createSignal({ hours: 0, minutes: 0, seconds: 0 });
  const hours = () => state().hours;
  const minutes = () => state().minutes;
  const seconds = () => state().seconds;

  onMount(() => {
    const update = () => {
      const d = new Date();
      setState({
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
      });
    };
    update();
    const interval = setInterval(update, 1000);

    onCleanup(() => clearInterval(interval));
  });

  return { hours, minutes, seconds };
};

const Dot = () => {
  const { hours, minutes, seconds } = useClock();

  const hourAngle = () => (hours() % 12) * 30 + minutes() * 0.5;
  const minuteAngle = () => minutes() * 6 + seconds() * 0.1;
  const secondAngle = () => seconds() * 6;

  return (
    <div class="flex h-full w-full items-center justify-center p-8">
      <div class="border-base-content/10 bg-base-100 relative flex aspect-square w-full max-w-[300px] items-center justify-center rounded-full border-2 shadow-2xl">
        {/* HOURS */}
        <div
          class="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${hourAngle()}deg)` } as any}>
          <div class="bg-primary shadow-primary absolute top-10 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* MINUTES */}
        <div
          class="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${minuteAngle()}deg)` } as any}>
          <div class="bg-secondary shadow-secondary absolute top-8 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* SECONDS */}
        <div
          class="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${secondAngle()}deg)` } as any}>
          <div class="bg-accent shadow-accent absolute top-5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* CENTER DOT */}
        <div class="bg-base-content absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
      </div>
    </div>
  );
};

const Minimal = () => {
  const { hours, minutes, seconds } = useClock();

  return (
    <div class="flex h-full w-full items-center justify-center p-8">
      <div class="border-base-content/10 bg-base-100 flex aspect-square w-full max-w-[300px] items-center justify-center rounded-full border-2 shadow-2xl">
        <div class="flex items-baseline font-mono tracking-tighter tabular-nums">
          <p class="text-primary text-5xl font-black">{addZero(hours())}</p>
          <p class="text-base-content/20 mx-1 mb-1 text-5xl font-black">:</p>
          <p class="text-secondary text-5xl font-black">{addZero(minutes())}</p>
          <p class="text-base-content/20 mx-1 mb-1 text-5xl font-black">:</p>
          <p class="text-accent text-5xl font-black">{addZero(seconds())}</p>
        </div>
      </div>
    </div>
  );
};

export const WatchFaceModal = ({ onClose }: { onClose: () => void }) => {
  const [face, setFace] = createSignal<'dot' | 'minimal'>('dot');

  return (
    <ModalWrapper
      onClose={onClose}
      title="Watchface"
      subtitle={face() === 'dot' ? 'Dot Analog' : 'Minimal Digital'}
      fullHeight>
      <div class="bg-base-300 relative flex-1 overflow-hidden shadow-inner">
        {face() === 'dot' ? <Dot /> : <Minimal />}
      </div>

      <div class="border-base-300 bg-base-200 flex shrink-0 justify-center gap-3 border-t p-4">
        <button
          class={`btn btn-sm font-mono tracking-widest ${face() === 'dot' ? 'btn-primary' : 'btn-outline border-base-content/20'}`}
          onClick={() => setFace('dot')}>
          DOT
        </button>
        <button
          class={`btn btn-sm font-mono tracking-widest ${face() === 'minimal' ? 'btn-primary' : 'btn-outline border-base-content/20'}`}
          onClick={() => setFace('minimal')}>
          MINIMAL
        </button>
      </div>
    </ModalWrapper>
  );
};
