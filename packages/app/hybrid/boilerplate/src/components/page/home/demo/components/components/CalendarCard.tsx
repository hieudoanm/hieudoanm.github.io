import { FC } from 'react';

export const CalendarCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={`h${i}`} className="text-base-content/50 font-medium">
            {d}
          </div>
        ))}
        {[12, 13, 14, 15, 16, 17, 18].map((day) => (
          <div
            key={day}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              day === 14 ? 'bg-primary text-primary-content' : ''
            }`}>
            {day}
          </div>
        ))}
      </div>
      <div className="divider my-1" />
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="toggle toggle-sm toggle-primary" />
          Show all day events
        </label>
      </div>
      <input
        type="text"
        placeholder="Search for events"
        className="input input-sm input-bordered mt-2 w-full"
      />
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="badge badge-sm badge-neutral">1h</span>
        Team Sync Meeting
      </div>
    </div>
  </div>
);

CalendarCard.displayName = 'CalendarCard';
