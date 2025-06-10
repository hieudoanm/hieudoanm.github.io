import { WidgetWalletBank } from '@web/widgets/wallet/WidgetWalletBank';
import { WidgetWalletPay } from '@web/widgets/wallet/WidgetWalletPay';
import { NextPage } from 'next';

const WalletPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetWalletBank />
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
