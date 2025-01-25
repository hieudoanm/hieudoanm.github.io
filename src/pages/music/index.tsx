import { WidgetMusicApps } from '@nothing/widgets/music/WidgetMusicApps';
import { WidgetMusicPlayer } from '@nothing/widgets/music/WidgetMusicPlayer';
import { NextPage } from 'next';

const MusicPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetMusicPlayer />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetMusicApps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
