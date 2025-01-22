import { WidgetHealth } from '@nothing/widgets/health/WidgetHealth';
import { NextPage } from 'next';

const HealthPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetHealth />
      </div>
    </div>
  );
};

export default HealthPage;
