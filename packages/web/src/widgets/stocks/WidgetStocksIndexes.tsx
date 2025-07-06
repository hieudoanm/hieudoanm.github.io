export const WidgetStocksIndexes = () => {
  const stocks = [
    { index: 'VNI', point: 1200, change: 10 },
    { index: 'HNX', point: 200, change: 0 },
    { index: 'UPCOM', point: 100, change: -10 },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="grid h-full grid-rows-3">
          {stocks.map(({ index, point, change }, i, array) => {
            const last: boolean = array.length - 1 === i;
            return (
              <div
                key={index}
                className={`col-span-1 ${last ? '' : 'border-b border-neutral-700'}`}>
                <div className="flex h-full items-center justify-between">
                  <div className="flex grow flex-col items-start justify-center">
                    <p>{index}</p>
                    <p
                      className={`${change === 0 ? 'text-neutral-500' : change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {change === 0 ? '=' : change > 0 ? '+' : '-'}{' '}
                      {Math.abs(change).toFixed(2)}%
                    </p>
                  </div>
                  <p className="text-2xl font-black">
                    {point.toLocaleString()}
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
