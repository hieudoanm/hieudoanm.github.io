import { WidgetFitnessRun } from '@nothing/widgets/fitness/WidgetFitnessRun';
import { WidgetFitnessStepCount } from '@nothing/widgets/fitness/WidgetFitnessStepCount';
import { NextPage } from 'next';

const FitnessPage: NextPage = () => {
  return (
    <div className="h-100vh w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetFitnessRun />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetFitnessStepCount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;
