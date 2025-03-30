import { WidgetTranslate } from '@web/widgets/translate/WidgetTranslate';
import { NextPage } from 'next';

const TranslatePage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetTranslate />
      </div>
    </div>
  );
};

export default TranslatePage;
