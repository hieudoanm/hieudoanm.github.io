import { FC } from 'react';

export const TaskInput: FC<{
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
}> = ({ value, onChange, onAdd }) => (
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="New task…"
      className="input input-bordered input-xs flex-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onAdd()}
    />
    <button
      className="btn btn-primary btn-xs btn-circle"
      onClick={onAdd}
      disabled={!value.trim()}>
      +
    </button>
  </div>
);
TaskInput.displayName = 'TaskInput';
