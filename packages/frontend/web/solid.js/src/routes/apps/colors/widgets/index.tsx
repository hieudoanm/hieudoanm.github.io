import { WidgetColorsPicker } from '~/widgets/colors';
import { WidgetColorsConverter } from '~/widgets/colors/WidgetColorsConverter';

const ColorsPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetColorsConverter />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetColorsPicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;
