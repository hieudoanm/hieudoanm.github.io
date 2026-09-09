'use client';

import { type FC } from 'react';
import type { Task } from '@/types';

export const TaskItem: FC<{
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}> = ({ task, onToggle, onDelete }) => (
  <li className="hover:bg-base-300 flex items-center gap-2 rounded-full px-2 py-2 transition-colors">
    <input
      type="checkbox"
      aria-label={`Toggle ${task.text}`}
      className="checkbox checkbox-primary checkbox-sm shrink-0"
      checked={task.completed}
      onChange={() => onToggle(task)}
    />
    <span
      className={`flex-1 truncate text-sm ${
        task.completed ? 'text-base-content/30 line-through' : ''
      }`}>
      {task.text}
    </span>
    <button
      type="button"
      aria-label={`Delete ${task.text}`}
      className="btn btn-ghost btn-xs btn-circle text-error shrink-0 opacity-0 hover:opacity-100 [li:hover_&]:opacity-100"
      onClick={() => onDelete(task.id)}>
      ✕
    </button>
  </li>
);

TaskItem.displayName = 'TaskItem';
