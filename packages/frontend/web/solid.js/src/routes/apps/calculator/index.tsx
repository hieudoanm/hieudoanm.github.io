import { WidgetCalculatorConvertWeight } from '~/widgets';
import { WidgetCalculatorBasic } from '~/widgets/calculator/WidgetCalculatorBasic';
import { WidgetCalculatorConvertForex } from '~/widgets/calculator/WidgetCalculatorConvertForex';
import { WidgetCalculatorConvertLength } from '~/widgets/calculator/WidgetCalculatorConvertLength';

const CalculatorPage = () => {
  return (
    <div class="h-[200vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetCalculatorBasic />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetCalculatorConvertForex />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetCalculatorConvertLength />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetCalculatorConvertWeight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
