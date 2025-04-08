export const WidgetWalletForex = () => {
  const forex = [
    { symbol: 'GBP', price: 32000 },
    { symbol: 'EUR', price: 26000 },
    { symbol: 'USD', price: 25000 },
    { symbol: 'SGD', price: 19000 },
    { symbol: 'AUD', price: 16000 },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="grid h-full grid-rows-6">
          <div class="flex w-full items-center justify-between">
            <p>Forex</p>
            <p class="font-black">VND</p>
          </div>
          {forex.map(({ symbol, price }) => {
            return (
              <div title={symbol} class="col-span-1">
                <div class="flex h-full w-full items-center justify-between">
                  <p class="text-red-500">{symbol}</p>
                  <p class="font-black">
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
