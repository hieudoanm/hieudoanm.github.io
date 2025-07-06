import { WidgetVideos } from '@web/widgets/videos/WidgetVideos';
import { NextPage } from 'next';

const WalletPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full items-center justify-center">
        <WidgetVideos />
      </div>
    </div>
  );
};

export default WalletPage;
