import { FC } from 'react';

export const MediaPlayerCard: FC = () => (
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

MediaPlayerCard.displayName = 'MediaPlayerCard';
