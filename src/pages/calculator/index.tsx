import { WidgetCalculator } from '@nothing/widgets/calculator/WidgetCalculator';
import { NextPage } from 'next';

const CalculatorPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetCalculator />
      </div>
    </div>
  );
};

export default CalculatorPage;
