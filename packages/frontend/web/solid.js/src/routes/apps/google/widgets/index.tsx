import { WidgetGoogleTrends } from '~/widgets/google';

const GoogleWidgetsPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="grid h-full grid-cols-1">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetGoogleTrends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleWidgetsPage;
