import { WidgetMaps } from '@nothing/widgets/maps/WidgetMaps';
import { NextPage } from 'next';

const MapsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetMaps />
      </div>
    </div>
  );
};

export default MapsPage;
