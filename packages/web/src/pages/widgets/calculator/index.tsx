import { WidgetCalculatorBasic } from '@web/widgets/calculator/WidgetCalculatorBasic';
import { NextPage } from 'next';

const CalculatorPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100 md:h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <WidgetCalculatorBasic />
      </div>
    </div>
  );
};

export default CalculatorPage;
