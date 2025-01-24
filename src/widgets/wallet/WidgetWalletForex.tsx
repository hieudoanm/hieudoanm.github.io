export const WidgetWalletForex = () => {
  const forex = [
    { symbol: 'GBP', price: 32000 },
    { symbol: 'EUR', price: 26000 },
    { symbol: 'USD', price: 25000 },
    { symbol: 'SGD', price: 19000 },
    { symbol: 'AUD', price: 16000 },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
      <div className="h-full w-full p-8">
        <div className="grid h-full grid-rows-6">
          <div className="flex w-full items-center justify-between">
            <p>Forex</p>
            <p className="font-black">VND</p>
          </div>
          {forex.map(({ symbol, price }) => {
            return (
              <div key={symbol} className="col-span-1">
                <div className="flex h-full w-full items-center justify-between">
                  <p className="text-red-500">{symbol}</p>
                  <p className="font-black">
                    {price.toLocaleString('vi')} <sup>đ</sup>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
