import { WidgetColorsPicker } from '@nothing/widgets/colors';
import { WidgetColorsConverter } from '@nothing/widgets/colors/WidgetColorsConverter';
import { NextPage } from 'next';

const ColorsPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetColorsConverter />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetColorsPicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;
