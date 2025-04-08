import {
  FaSolidVoicemail,
  FaSolidStar,
  FaSolidPlus,
  FaSolidPhone,
} from 'solid-icons/fa';

export const WidgetPhoneDialer = () => {
  const items = [
    1,
    2,
    3,
    <FaSolidVoicemail title="voice-mail" />,
    4,
    5,
    6,
    <FaSolidStar title="star" />,
    7,
    8,
    9,
    <FaSolidPlus title="contacts" />,
    '*',
    0,
    '#',
    <FaSolidPhone title="phone" />,
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900">
      <div class="h-full w-full p-6">
        <div class="grid h-full grid-cols-4">
          {items.map((item, index) => {
            return (
              <div
                title={'item-' + index}
                class="col-span-1 flex h-full items-center justify-center">
                <div class="flex aspect-square w-10 items-center justify-center rounded-full bg-white font-black text-black hover:bg-red-500 hover:text-gray-100">
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
