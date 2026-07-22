import { FC } from 'react';

const MediaPlayerCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <h3 className="card-title text-sm">PM Zoomcall ASMR</h3>
      <p className="text-base-content/50 text-xs">
        Project Manager talking for 2 hours
      </p>
      <div className="flex gap-2">
        <button className="btn btn-square btn-neutral btn-sm">⏮</button>
        <button className="btn btn-square btn-neutral btn-sm">▶</button>
        <button className="btn btn-square btn-neutral btn-sm">⏭</button>
      </div>
      <progress className="progress w-full" value={10} max={100} />
      <div className="text-base-content/50 text-xs">13:39 / 120:00</div>
      <div className="flex gap-2">
        <button className="btn btn-square btn-sm">⇄</button>
        <button className="btn btn-square btn-sm">↻</button>
        <button className="btn btn-square btn-sm">☰</button>
        <button className="btn btn-square btn-sm">🔊</button>
      </div>
    </div>
  </div>
);

const MockupCodeCard: FC = () => (
  <div className="mockup-code">
    <pre data-prefix="$">
      <code>npm i daisyui</code>
    </pre>
    <pre data-prefix=">" className="text-warning">
      <code>installing...</code>
    </pre>
    <pre data-prefix=">" className="text-success">
      <code>Done!</code>
    </pre>
  </div>
);

export const DemoColumn3: FC = () => (
  <div className="flex flex-col gap-4">
    <MediaPlayerCard />
    <MockupCodeCard />
  </div>
);
DemoColumn3.displayName = 'DemoColumn3';
