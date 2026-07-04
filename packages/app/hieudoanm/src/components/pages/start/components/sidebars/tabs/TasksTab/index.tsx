import { useIndexedDB } from '@frontend/react';
import { FC, useEffect, useState } from 'react';

import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { Task } from './types';

export type { Task };

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
      <div className="border-base-300 border-b p-3">
        <TaskInput value={newTask} onChange={setNewTask} onAdd={handleAdd} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            No tasks yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 p-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>

      <footer className="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {pending} pending · {tasks.length} total
        </p>
      </footer>
    </div>
  );
};
TasksTab.displayName = 'TasksTab';
