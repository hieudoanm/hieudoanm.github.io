import { WidgetCalculatorConvertWeight } from '@nothing/widgets';
import { WidgetCalculatorBasic } from '@nothing/widgets/calculator/WidgetCalculatorBasic';
import { WidgetCalculatorConvertForex } from '@nothing/widgets/calculator/WidgetCalculatorConvertForex';
import { WidgetCalculatorConvertLength } from '@nothing/widgets/calculator/WidgetCalculatorConvertLength';
import { NextPage } from 'next';

const CalculatorPage: NextPage = () => {
  return (
    <div className="h-[200vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCalculatorBasic />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCalculatorConvertForex />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCalculatorConvertLength />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCalculatorConvertWeight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
