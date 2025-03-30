import { WidgetHome } from '@web/widgets/home/WidgetHome';
import { NextPage } from 'next';

const HousePage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetHome />
      </div>
    </div>
  );
};

export default HousePage;
