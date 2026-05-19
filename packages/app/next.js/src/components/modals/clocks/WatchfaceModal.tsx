import { FC, useEffect, useState } from 'react';

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

const useClock = () => {
  const [state, setState] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Initialize state immediately so there's no layout flash
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

    return () => clearInterval(interval);
  }, []);

  return { hours: state.hours, minutes: state.minutes, seconds: state.seconds };
};

const Dot: FC = () => {
  const { hours, minutes, seconds } = useClock();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="border-base-content/10 bg-base-100 relative flex aspect-square w-full max-w-[300px] items-center justify-center rounded-full border-2 shadow-2xl">
        {/* HOURS */}
        <div
          className="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${hourAngle}deg)` }}>
          <div className="bg-primary shadow-primary absolute top-10 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* MINUTES */}
        <div
          className="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${minuteAngle}deg)` }}>
          <div className="bg-secondary shadow-secondary absolute top-8 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* SECONDS */}
        <div
          className="absolute h-full w-full transition-transform duration-[1000ms] ease-linear"
          style={{ transform: `rotate(${secondAngle}deg)` }}>
          <div className="bg-accent shadow-accent absolute top-5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)]" />
        </div>

        {/* CENTER DOT */}
        <div className="bg-base-content absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
      </div>
    </div>
  );
};

const Minimal: FC = () => {
  const { hours, minutes, seconds } = useClock();

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="border-base-content/10 bg-base-100 flex aspect-square w-full max-w-[300px] items-center justify-center rounded-full border-2 shadow-2xl">
        <div className="flex items-baseline font-mono tracking-tighter tabular-nums">
          <p className="text-primary text-5xl font-black">{addZero(hours)}</p>
          <p className="text-base-content/20 mx-1 mb-1 text-5xl font-black">
            :
          </p>
          <p className="text-secondary text-5xl font-black">
            {addZero(minutes)}
          </p>
          <p className="text-base-content/20 mx-1 mb-1 text-5xl font-black">
            :
          </p>
          <p className="text-accent text-5xl font-black">{addZero(seconds)}</p>
        </div>
      </div>
    </div>
  );
};

export const WatchFaceModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [face, setFace] = useState<'dot' | 'minimal'>('dot');

  return (
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="card bg-base-100 border-base-300 z-10 flex h-[500px] w-full max-w-sm flex-col overflow-hidden border p-0 shadow-2xl">
        {/* Header */}
        <div className="border-base-300 bg-base-100/50 flex items-center justify-between border-b p-5 backdrop-blur">
          <div>
            <h2 className="text-lg font-black tracking-tight">Watchface</h2>
            <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
              {face === 'dot' ? 'Dot Analog' : 'Minimal Digital'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-square text-base">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="bg-base-300 relative flex-1 overflow-hidden shadow-inner">
          {face === 'dot' ? <Dot /> : <Minimal />}
        </div>

        {/* Controls */}
        <div className="border-base-300 bg-base-200 flex justify-center gap-3 border-t p-4">
          <button
            className={`btn btn-sm font-mono tracking-widest ${face === 'dot' ? 'btn-primary' : 'btn-outline border-base-content/20'}`}
            onClick={() => setFace('dot')}>
            DOT
          </button>
          <button
            className={`btn btn-sm font-mono tracking-widest ${face === 'minimal' ? 'btn-primary' : 'btn-outline border-base-content/20'}`}
            onClick={() => setFace('minimal')}>
            MINIMAL
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
