import { WidgetTransportation } from '~/widgets/transportation/WidgetTransportation';

const DevicesPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetTransportation />
      </div>
    </div>
  );
};

export default DevicesPage;
