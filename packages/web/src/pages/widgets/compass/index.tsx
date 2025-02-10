import { WidgetCompassCompact } from '@nothing/widgets';
import { WidgetCompassFull } from '@nothing/widgets/compass/WidgetCompassFull';
import { NextPage } from 'next';

const CompassPage: NextPage = () => {
  return (
    <div className="h-100vh w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCompassCompact />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCompassFull />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassPage;
