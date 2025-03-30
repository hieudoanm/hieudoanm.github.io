import { WidgetBattery } from '@web/widgets/battery/WidgetBattery';
import { NextPage } from 'next';

const BatteryPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetBattery />
      </div>
    </div>
  );
};

export default BatteryPage;
