'use client';

import { type FC } from 'react';

export const TaskInput: FC<{
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
}> = ({ value, onChange, onAdd }) => (
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="New task…"
      aria-label="New task"
      className="input input-bordered input-sm flex-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onAdd()}
    />
    <button
      type="button"
      aria-label="Add task"
      className="btn btn-primary btn-sm btn-circle"
      onClick={onAdd}
      disabled={!value.trim()}>
      +
    </button>
  </div>
);

TaskInput.displayName = 'TaskInput';
