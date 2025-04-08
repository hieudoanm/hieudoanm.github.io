import { FaSolidCamera } from 'solid-icons/fa';

export const WidgetTranslate = () => {
  const icons = [
    <p title="languages" class="font-semibold">
      English to Korean
    </p>,
    <FaSolidCamera title="security" class="text-3xl" />,
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="flex h-full w-full flex-col px-8 py-8">
        <div class="pb-8">
          <p class="text-center font-black">Translate</p>
        </div>
        <div class="grid grow grid-cols-2 gap-y-8">
          {icons.map((icon, index) => {
            return (
              <div title={'item' + index} class="col-span-2">
                <div class="flex h-full w-full items-center justify-center">
                  <div class="flex h-full w-full items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-gray-100">
                    {icon}
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
