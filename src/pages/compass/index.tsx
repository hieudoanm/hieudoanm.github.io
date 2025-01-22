import { WidgetCompass } from '@nothing/widgets/compass/WidgetCompass';
import { NextPage } from 'next';

const CompassPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetCompass />
      </div>
    </div>
  );
};

export default CompassPage;
