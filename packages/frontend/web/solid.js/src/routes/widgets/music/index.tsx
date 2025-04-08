import { WidgetMusicApps } from '~/widgets/music/WidgetMusicApps';
import { WidgetMusicPlayer } from '~/widgets/music/WidgetMusicPlayer';

const MusicPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetMusicPlayer />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetMusicApps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
