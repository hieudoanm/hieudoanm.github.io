export const WidgetFitnessStepCount = () => {
  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-8">
        <div class="grid h-full grid-rows-5">
          <div class="row-span-1">
            <div class="flex h-full items-center">
              <p class="text-2xl font-bold">Step Count</p>
            </div>
          </div>
          <div class="row-span-2">
            <div class="flex h-full items-center justify-between">
              <p class="text-4xl font-black text-red-500">10,000</p>
              <div class="flex h-full items-end">
                <p class="text-sm">steps</p>
              </div>
            </div>
          </div>
          <div class="row-span-2">
            <div class="flex h-full items-center justify-between">
              <p class="text-4xl font-black text-red-500">2,500</p>
              <div class="flex h-full items-end">
                <p class="text-sm">calories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
