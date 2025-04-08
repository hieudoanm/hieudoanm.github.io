import {
  FaSolidWallet,
  FaSolidMoneyBillTransfer,
  FaSolidQrcode,
  FaSolidMoneyBill,
} from 'solid-icons/fa';

export const WidgetWalletBank = () => {
  const icons = [
    <FaSolidWallet title="accounts" />,
    <FaSolidMoneyBillTransfer title="transfer" />,
    <FaSolidQrcode title="qrcode" />,
    <FaSolidMoneyBill title="cash" />,
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="flex h-full w-full flex-col p-6">
        <div class="grid grid-cols-2 pb-2">
          <div class="col-span-1">
            <h1 class="text-center font-black">Wallet</h1>
          </div>
          <div class="col-span-1">
            <p class="text-center text-sm">Techcombank</p>
          </div>
        </div>
        <div class="grid grow grid-cols-2">
          {icons.map((icon, index) => {
            return (
              <div title={'item' + index} class="col-span-1">
                <div class="flex h-full w-full items-center justify-center">
                  <div class="flex aspect-square w-[75%] items-center justify-center rounded-full bg-white text-4xl text-black hover:bg-red-500 hover:text-gray-100">
                    {icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
