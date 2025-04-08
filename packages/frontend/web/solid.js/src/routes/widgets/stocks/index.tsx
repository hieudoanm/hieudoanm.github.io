import { WidgetStocksIndexes } from '~/widgets/stocks/WidgetStocksIndexes';
import { WidgetStocksSymbols } from '~/widgets/stocks/WidgetStocksSymbols';

const StocksPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetStocksIndexes />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetStocksSymbols />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksPage;
