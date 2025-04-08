import { WidgetDevices } from '~/widgets/devices/WidgetDevices';

const DevicesPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetDevices />
      </div>
    </div>
  );
};

export default DevicesPage;
