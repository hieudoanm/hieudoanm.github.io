import { FC } from 'react';
import { Task } from './types';

export const TaskItem: FC<{
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}> = ({ task, onToggle, onDelete }) => (
  <li className="hover:bg-base-300 flex items-center gap-2 rounded-full px-2 py-2 transition-colors">
    <input
      type="checkbox"
      className="checkbox checkbox-primary checkbox-xs shrink-0"
      checked={task.completed}
      onChange={() => onToggle(task)}
    />
    <span
      className={`flex-1 truncate text-xs ${
        task.completed ? 'text-base-content/30 line-through' : ''
      }`}>
      {task.text}
    </span>
    <button
      className="btn btn-ghost btn-xs btn-circle text-error shrink-0 opacity-0 hover:opacity-100 [li:hover_&]:opacity-100"
      onClick={() => onDelete(task.id)}>
      ✕
    </button>
  </li>
);
TaskItem.displayName = 'TaskItem';
