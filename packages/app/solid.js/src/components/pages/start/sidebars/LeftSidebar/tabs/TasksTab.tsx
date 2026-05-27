import useIndexedDB from '@hieudoanm.github.io/hooks/useIndexedDB';
import { createSignal, onMount } from 'solid-js';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const TasksTab = () => {
  const { database, list, add, update, remove } = useIndexedDB<Task>({
    databaseName: 'TasksDB',
    storeName: 'tasks',
  });

  const [tasks, setTasks] = createSignal<Task[]>([]);
  const [newTask, setNewTask] = createSignal('');

  onMount(() => {
    if (!database()) return;
    list().then(setTasks);
  });

  const refresh = async () => list().then(setTasks);

  const handleAdd = async () => {
    if (!newTask().trim()) return;
    await add(newTask().trim());
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

  const currentTasks = tasks();
  const pending = currentTasks.filter((t) => !t.completed).length;
  const nt = newTask();

  return (
    <div class="flex h-full flex-col">
      <div class="border-base-300 border-b p-3">
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="New task…"
            class="input input-bordered input-xs flex-1"
            value={nt}
            onChange={(e) => setNewTask(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            class="btn btn-primary btn-xs btn-circle"
            onClick={handleAdd}
            disabled={!nt.trim()}>
            +
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        {currentTasks.length === 0 ? (
          <p class="text-base-content/25 py-8 text-center text-xs">
            No tasks yet.
          </p>
        ) : (
          <ul class="flex flex-col gap-0.5 p-3">
            {currentTasks.map((task) => (
              <li class="hover:bg-base-300 flex items-center gap-2 rounded-lg px-2 py-2 transition-colors">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary checkbox-xs shrink-0"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <span
                  class={`flex-1 truncate text-xs ${
                    task.completed ? 'text-base-content/30 line-through' : ''
                  }`}>
                  {task.text}
                </span>
                <button
                  class="btn btn-ghost btn-xs btn-circle text-error shrink-0 opacity-0 hover:opacity-100 [li:hover_&]:opacity-100"
                  onClick={() => handleDelete(task.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer class="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p class="text-xs tracking-widest uppercase opacity-20">
          {pending} pending · {currentTasks.length} total
        </p>
      </footer>
    </div>
  );
};
