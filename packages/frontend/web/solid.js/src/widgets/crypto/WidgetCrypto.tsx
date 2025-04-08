export const WidgetCrypto = () => {
  const stocks = [
    { symbol: 'BTC', price: 100000, change: 10 },
    { symbol: 'ETH', price: 3500, change: 0 },
    { symbol: 'XRP', price: 4, change: -10 },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-8">
        <div class="grid h-full grid-rows-3">
          {stocks.map(({ symbol, price, change }, index, array) => {
            const last: boolean = array.length - 1 === index;
            return (
              <div
                title={symbol}
                class={`col-span-1 ${last ? '' : 'border-b border-gray-700'}`}>
                <div class="flex h-full items-center">
                  <div class="w-full">
                    <p>
                      <span class="font-black">{symbol}</span> / USD
                    </p>
                    <div class="flex w-full items-center justify-between">
                      <p
                        class={`${change === 0 ? 'text-gray-500' : change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change === 0 ? '=' : change > 0 ? '+' : '-'}{' '}
                        {Math.abs(change).toFixed(2)}%
                      </p>
                      <p class="font-black">${price.toLocaleString('en-us')}</p>
                    </div>
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
