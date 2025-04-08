export const WidgetSports = () => {
  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="grid h-full grid-rows-5">
          <div class="row-span-1">
            <div class="flex h-full items-center justify-between">
              <p>
                March 5<sup>th</sup>, 2023
              </p>
              <p class="text-right text-red-500">90&apos;</p>
            </div>
          </div>
          <div class="row-span-1">
            <div class="grid h-full grid-cols-2 items-center gap-x-2">
              <div class="col-span-1">
                <p class="truncate font-black">Liverpool</p>
              </div>
              <div class="col-span-1">
                <p class="truncate text-right font-black">Man United</p>
              </div>
            </div>
          </div>
          <div class="row-span-3">
            <div class="grid h-full grid-cols-2 items-center gap-x-2">
              <div class="col-span-1">
                <p class="text-center text-8xl text-red-500">7</p>
              </div>
              <div class="col-span-1">
                <p class="text-center text-8xl text-red-500">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
