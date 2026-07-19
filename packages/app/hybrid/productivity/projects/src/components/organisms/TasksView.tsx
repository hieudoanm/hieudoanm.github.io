'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useData } from '@/providers/DataProvider';
import { useState, type FC } from 'react';
import type { Task } from '@/types';
import { TaskInput } from '@/components/molecules/TaskInput';
import { TaskItem } from '@/components/molecules/TaskItem';

const sortTasks = (tasks: Task[]): Task[] => {
  const sorted = [...tasks];
  sorted.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return sorted;
};

export const TasksView: FC = () => {
  const { currentUser } = useAuth();
  const { tasks, addTask, toggleTask, deleteTask } = useData();
  const [newTask, setNewTask] = useState('');

  if (!currentUser) return null;

  const userTasks = tasks.filter((t) => t.userId === currentUser.id);
  const pending = userTasks.filter((t) => !t.completed).length;

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTask(currentUser.id, newTask.trim());
    setNewTask('');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 bg-base-100 border-b p-3">
        <TaskInput value={newTask} onChange={setNewTask} onAdd={handleAdd} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {userTasks.length === 0 ? (
          <p className="text-base-content/25 py-8 text-center text-xs">
            No tasks yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 p-3">
            {sortTasks(userTasks).map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={(t) => toggleTask(t.id)}
                onDelete={(id) => deleteTask(id)}
              />
            ))}
          </ul>
        )}
      </div>
      <footer className="border-base-300 bg-base-100 border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {pending} pending · {userTasks.length} total
        </p>
      </footer>
    </div>
  );
};

TasksView.displayName = 'TasksView';
