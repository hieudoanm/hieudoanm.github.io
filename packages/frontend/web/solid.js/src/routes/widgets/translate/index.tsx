import { WidgetTranslate } from '~/widgets/translate/WidgetTranslate';

const TranslatePage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetTranslate />
      </div>
    </div>
  );
};

export default TranslatePage;
