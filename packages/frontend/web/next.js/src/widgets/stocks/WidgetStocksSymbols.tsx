export const WidgetStocksSymbols = () => {
  const stocks = [
    { symbol: 'TCB', price: 30000, change: 10 },
    { symbol: 'MSN', price: 100000, change: 0 },
    { symbol: 'VIC', price: 50000, change: -10 },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="grid h-full grid-rows-3">
          {stocks.map(({ symbol, price, change }, index, array) => {
            const last: boolean = array.length - 1 === index;
            return (
              <div
                key={symbol}
                className={`col-span-1 ${last ? '' : 'border-b border-neutral-700'}`}>
                <div className="flex h-full items-center">
                  <div className="w-full">
                    <p>
                      <span className="font-black">{symbol}</span> / VND
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <p
                        className={`${change === 0 ? 'text-neutral-500' : change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change === 0 ? '=' : change > 0 ? '+' : '-'}{' '}
                        {Math.abs(change).toFixed(2)}%
                      </p>
                      <p className="font-black">
                        {price.toLocaleString()} <sup>đ</sup>
                      </p>
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
