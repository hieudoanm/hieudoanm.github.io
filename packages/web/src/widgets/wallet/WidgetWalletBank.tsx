import {
  FaWallet,
  FaMoneyBillTransfer,
  FaQrcode,
  FaMoneyBill,
} from 'react-icons/fa6';

export const WidgetWalletBank = () => {
  const icons = [
    <FaWallet key="accounts" />,
    <FaMoneyBillTransfer key="transfer" />,
    <FaQrcode key="qrcode" />,
    <FaMoneyBill key="cash" />,
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="flex h-full w-full flex-col p-6">
        <div className="grid grid-cols-2 pb-2">
          <div className="col-span-1">
            <h1 className="text-center font-black">Wallet</h1>
          </div>
          <div className="col-span-1">
            <p className="text-center text-sm">Techcombank</p>
          </div>
        </div>
        <div className="grid grow grid-cols-2">
          {icons.map((icon, index) => {
            return (
              <div key={'item' + index} className="col-span-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex aspect-square w-[75%] items-center justify-center rounded-full bg-white text-4xl text-black hover:bg-red-500 hover:text-neutral-100">
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
