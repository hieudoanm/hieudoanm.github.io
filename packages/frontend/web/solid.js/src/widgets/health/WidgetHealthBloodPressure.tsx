export const WidgetHealthBloodPressure = () => {
  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-8">
        <div class="grid h-full grid-rows-10">
          <div class="row-span-1">
            <div class="flex h-full items-center justify-between">
              <p class="text-xl font-black">Health</p>
              <p class="truncate text-sm">Blood Pressure</p>
            </div>
          </div>
          <div class="row-span-3">
            <div class="flex h-full items-end justify-between">
              <p class="text-4xl font-black text-red-500">120</p>
              <p class="truncate text-sm">SYS (mmHg)</p>
            </div>
          </div>
          <div class="row-span-3">
            <div class="flex h-full items-end justify-between">
              <p class="text-4xl font-black text-red-500">80</p>
              <p class="text-sm">DIA (mmHg)</p>
            </div>
          </div>
          <div class="row-span-3">
            <div class="flex h-full items-end justify-between">
              <p class="text-4xl font-black text-red-500">80</p>

              <p class="text-sm">BPM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
