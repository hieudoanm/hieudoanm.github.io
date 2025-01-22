import { WidgetStocks } from '@nothing/widgets/stocks/WidgetStocks';
import { NextPage } from 'next';

const StocksPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetStocks />
      </div>
    </div>
  );
};

export default StocksPage;
