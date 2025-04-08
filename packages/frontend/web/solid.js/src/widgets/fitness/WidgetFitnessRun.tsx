export const WidgetFitnessRun = () => {
  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-8">
        <div class="grid h-full grid-rows-5">
          <div class="row-span-1">
            <div class="flex h-full items-center">
              <p class="text-2xl font-bold">Run</p>
            </div>
          </div>
          <div class="row-span-2">
            <div class="flex h-full items-center justify-between">
              <p class="text-4xl font-black text-red-500">10</p>
              <div class="flex h-full items-end">
                <p class="text-sm">distance (km)</p>
              </div>
            </div>
          </div>
          <div class="row-span-2">
            <div class="flex h-full items-center justify-between">
              <p class="text-4xl font-black text-red-500">5</p>
              <div class="flex h-full items-end">
                <p class="text-sm">pace (minutes/km)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
