import { WidgetWallet } from '@nothing/widgets/wallet/WidgetWallet';
import { NextPage } from 'next';

const WalletPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetWallet />
      </div>
    </div>
  );
};

export default WalletPage;
