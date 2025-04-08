import {
  FaSolidFileWord,
  FaSolidFilePowerpoint,
  FaSolidFileVideo,
  FaSolidFileImage,
} from 'solid-icons/fa';

export const WidgetFiles = () => {
  const icons = [
    { icon: <FaSolidFileWord title="word" />, name: 'docs' },
    { icon: <FaSolidFilePowerpoint title="power-point" />, name: 'slides' },
    { icon: <FaSolidFileVideo title="video" />, name: 'video' },
    { icon: <FaSolidFileImage title="image" />, name: 'image' },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="flex h-full w-full flex-col px-8 py-6">
        <div class="grid grid-cols-2 pb-2">
          <div class="col-span-1">
            <h1 class="text-center font-black">Files</h1>
          </div>
          <div class="col-span-1">
            <p class="text-center text-sm">Recent</p>
          </div>
        </div>
        <div class="grid grow grid-cols-2">
          {icons.map(({ icon, name }, index) => {
            return (
              <div title={'item' + index} class="col-span-1">
                <div class="flex h-full w-full items-center justify-center">
                  <div class="flex flex-col gap-y-1">
                    <p class="text-5xl">{icon}</p>
                    <p class="text-center">{name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
