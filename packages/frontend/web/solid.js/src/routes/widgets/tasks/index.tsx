import { WidgetTasks } from '~/widgets/tasks/WidgetTasks';

const TasksPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetTasks />
      </div>
    </div>
  );
};

export default TasksPage;
