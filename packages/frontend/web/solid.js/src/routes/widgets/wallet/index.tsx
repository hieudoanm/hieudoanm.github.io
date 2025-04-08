import { WidgetWalletBank } from '~/widgets/wallet/WidgetWalletBank';
import { WidgetWalletForex } from '~/widgets/wallet/WidgetWalletForex';
import { WidgetWalletPay } from '~/widgets/wallet/WidgetWalletPay';

const WalletPage = () => {
  return (
    <div class="h-[150vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-3">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetWalletBank />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetWalletForex />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetWalletPay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
