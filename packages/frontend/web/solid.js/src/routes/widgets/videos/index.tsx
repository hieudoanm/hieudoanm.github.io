import { WidgetVideos } from '~/widgets/videos/WidgetVideos';

const WalletPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetVideos />
      </div>
    </div>
  );
};

export default WalletPage;
