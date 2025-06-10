import { FaVoicemail, FaStar, FaPlus, FaPhone } from 'react-icons/fa6';

export const WidgetPhoneDialer = () => {
  const items = [
    1,
    2,
    3,
    <FaVoicemail key="voice-mail" />,
    4,
    5,
    6,
    <FaStar key="star" />,
    7,
    8,
    9,
    <FaPlus key="contacts" />,
    '*',
    0,
    '#',
    <FaPhone key="phone" />,
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900">
      <div className="h-full w-full p-6">
        <div className="grid h-full grid-cols-4">
          {items.map((item, index) => {
            return (
              <div
                key={'item-' + index}
                className="col-span-1 flex h-full items-center justify-center">
                <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-white font-black text-black hover:bg-red-500 hover:text-neutral-100">
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
