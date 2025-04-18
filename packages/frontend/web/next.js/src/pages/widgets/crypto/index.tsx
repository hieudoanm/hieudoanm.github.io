import { WidgetCrypto } from '@web/widgets/crypto/WidgetCrypto';
import { NextPage } from 'next';

const StocksPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-1">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetCrypto />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksPage;
