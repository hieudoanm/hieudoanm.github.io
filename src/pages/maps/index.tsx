import { WidgetMapsCoordinates } from '@nothing/widgets/maps/WidgetMapsCoordinates';
import { WidgetMapsEmbedded } from '@nothing/widgets/maps/WidgetMapsEmbedded';
import { NextPage } from 'next';

const MapsPage: NextPage = () => {
  return (
    <div className="h-[200vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetMapsCoordinates />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetMapsEmbedded />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
