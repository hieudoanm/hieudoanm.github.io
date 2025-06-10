export const WidgetSports = () => {
  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-6">
        <div className="grid h-full grid-rows-5">
          <div className="row-span-1">
            <div className="flex h-full items-center justify-between">
              <p>
                March 5<sup>th</sup>, 2023
              </p>
              <p className="text-right text-red-500">90&apos;</p>
            </div>
          </div>
          <div className="row-span-1">
            <div className="grid h-full grid-cols-2 items-center gap-x-2">
              <div className="col-span-1">
                <p className="truncate font-black">Liverpool</p>
              </div>
              <div className="col-span-1">
                <p className="truncate text-right font-black">Man United</p>
              </div>
            </div>
          </div>
          <div className="row-span-3">
            <div className="grid h-full grid-cols-2 items-center gap-x-2">
              <div className="col-span-1">
                <p className="text-center text-8xl text-red-500">7</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-8xl text-red-500">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
