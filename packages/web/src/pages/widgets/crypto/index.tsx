import { WidgetCrypto } from '@nothing/widgets/crypto/WidgetCrypto';
import { NextPage } from 'next';

const CryptoPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetCrypto />
      </div>
    </div>
  );
};

export default CryptoPage;
