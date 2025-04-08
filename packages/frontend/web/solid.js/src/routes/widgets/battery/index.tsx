import { WidgetBattery } from '~/widgets/battery/WidgetBattery';

const BatteryPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetBattery />
      </div>
    </div>
  );
};

export default BatteryPage;
