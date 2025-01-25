import { WidgetWalletBank } from '@nothing/widgets/wallet/WidgetWalletBank';
import { WidgetWalletForex } from '@nothing/widgets/wallet/WidgetWalletForex';
import { WidgetWalletPay } from '@nothing/widgets/wallet/WidgetWalletPay';
import { NextPage } from 'next';

const WalletPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWalletBank />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWalletForex />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWalletPay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
