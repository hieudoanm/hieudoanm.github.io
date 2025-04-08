import { WidgetCrypto } from '~/widgets/crypto/WidgetCrypto';

const CryptoPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetCrypto />
      </div>
    </div>
  );
};

export default CryptoPage;
