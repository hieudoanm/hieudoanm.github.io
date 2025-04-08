import { WidgetHome } from '~/widgets/home/WidgetHome';

const HousePage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetHome />
      </div>
    </div>
  );
};

export default HousePage;
