import { WidgetStocksIndexes } from '@web/widgets/stocks/WidgetStocksIndexes';
import { WidgetStocksSymbols } from '@web/widgets/stocks/WidgetStocksSymbols';
import { NextPage } from 'next';

const StocksPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetStocksIndexes />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetStocksSymbols />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksPage;
