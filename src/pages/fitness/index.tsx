import { WidgetFitness } from '@nothing/widgets/fitness/WidgetFitness';
import { NextPage } from 'next';

const FitnessPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetFitness />
      </div>
    </div>
  );
};

export default FitnessPage;
