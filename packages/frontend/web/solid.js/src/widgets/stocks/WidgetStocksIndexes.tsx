export const WidgetStocksIndexes = () => {
  const stocks = [
    { index: 'VNI', point: 1200, change: 10 },
    { index: 'HNX', point: 200, change: 0 },
    { index: 'UPCOM', point: 100, change: -10 },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="grid h-full grid-rows-3">
          {stocks.map(({ index, point, change }, i, array) => {
            const last: boolean = array.length - 1 === i;
            return (
              <div
                title={index}
                class={`col-span-1 ${last ? '' : 'border-b border-gray-700'}`}>
                <div class="flex h-full items-center justify-between">
                  <div class="flex grow flex-col items-start justify-center">
                    <p>{index}</p>
                    <p
                      class={`${change === 0 ? 'text-gray-500' : change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {change === 0 ? '=' : change > 0 ? '+' : '-'}{' '}
                      {Math.abs(change).toFixed(2)}%
                    </p>
                  </div>
                  <p class="text-2xl font-black">{point.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
