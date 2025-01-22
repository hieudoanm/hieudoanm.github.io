import { NextPage } from 'next';

const StocksPage: NextPage = () => {
  const stocks = [
    { symbol: 'TCB', price: 30000, change: 10 },
    { symbol: 'MSN', price: 100000, change: 10 },
    { symbol: 'VIC', price: 50000, change: 10 },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-8">
            <div className="grid h-full grid-rows-3">
              {stocks.map(({ symbol, price, change }, index, array) => {
                const last: boolean = array.length - 1 === index;
                return (
                  <div
                    key={symbol}
                    className={`col-span-1 ${last ? '' : 'border-b border-gray-700'}`}>
                    <div className="flex h-full items-center">
                      <div className="w-full">
                        <p>
                          <span className="font-black">{symbol}</span> / VND
                        </p>
                        <div className="flex w-full items-center justify-between">
                          <p className="text-green-500">
                            +{change.toFixed(2)}%
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
      </div>
    </div>
  );
};

export default StocksPage;
