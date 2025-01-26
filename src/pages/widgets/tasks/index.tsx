import { WidgetTasks } from '@nothing/widgets/tasks/WidgetTasks';
import { NextPage } from 'next';

const TasksPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetTasks />
      </div>
    </div>
  );
};

export default TasksPage;
