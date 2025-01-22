import { WidgetMusic } from '@nothing/widgets/music/WidgetMusic';
import { NextPage } from 'next';

const MusicPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetMusic />
      </div>
    </div>
  );
};

export default MusicPage;
