import {
  FaSolidBus,
  FaSolidTrain,
  FaSolidTrainSubway,
  FaSolidTrainTram,
} from 'solid-icons/fa';

export const WidgetTransportation = () => {
  const icons = [
    <FaSolidBus title="bus" />,
    <FaSolidTrain title="train" />,
    <FaSolidTrainSubway title="subway" />,
    <FaSolidTrainTram title="tram" />,
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="flex h-full w-full flex-col px-8 py-6">
        <div class="pb-2 text-center">
          <h1 class="text-center font-black">Public Transportation</h1>
        </div>
        <div class="grid grow grid-cols-2">
          {icons.map((icon, index) => {
            return (
              <div title={'item' + index} class="col-span-1">
                <div class="flex h-full w-full items-center justify-center">
                  <div class="flex aspect-square w-[75%] items-center justify-center rounded-full bg-white text-4xl text-black hover:bg-red-500 hover:text-gray-100">
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
