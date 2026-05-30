import useIndexedDB from '@hieudoanm.github.io/hooks/use-indexed-db';
import { FC, useEffect, useState } from 'react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const TasksTab: FC = () => {
  const { database, list, add, update, remove } = useIndexedDB<Task>({
    databaseName: 'TasksDB',
    storeName: 'tasks',
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!database) return;
    list().then(setTasks);
  }, [database, list]);

  const refresh = async () => list().then(setTasks);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await add(newTask.trim());
    setNewTask('');
    await refresh();
  };

  const handleToggle = async (task: Task) => {
    await update({ ...task, completed: !task.completed });
    await refresh();
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    await refresh();
  };

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex h-full flex-col">
      {/* Input */}
      <div className="border-base-300 border-b p-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New task…"
            className="input input-bordered input-xs flex-1"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            className="btn btn-primary btn-xs btn-circle"
            onClick={handleAdd}
            disabled={!newTask.trim()}>
            +
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            No tasks yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 p-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="hover:bg-base-300 flex items-center gap-2 rounded-lg px-2 py-2 transition-colors">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs shrink-0"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <span
                  className={`flex-1 truncate text-xs ${
                    task.completed ? 'text-base-content/30 line-through' : ''
                  }`}>
                  {task.text}
                </span>
                <button
                  className="btn btn-ghost btn-xs btn-circle text-error shrink-0 opacity-0 hover:opacity-100 [li:hover_&]:opacity-100"
                  onClick={() => handleDelete(task.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <footer className="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {pending} pending · {tasks.length} total
        </p>
      </footer>
    </div>
  );
};
