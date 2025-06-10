import { WidgetDevices } from '@web/widgets/devices/WidgetDevices';
import { NextPage } from 'next';

const DevicesPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full items-center justify-center">
        <WidgetDevices />
      </div>
    </div>
  );
};

export default DevicesPage;
