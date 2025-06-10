import { FaDivide, FaEquals, FaMinus, FaPlus, FaX } from 'react-icons/fa6';

export const WidgetCalculatorBasic = () => {
  const items = [
    1,
    2,
    3,
    <FaDivide key="voice-mail" />,
    4,
    5,
    6,
    <FaX key="star" />,
    7,
    8,
    9,
    <FaMinus key="contacts" />,
    <FaEquals key="equals" />,
    0,
    ',',
    <FaPlus key="phone" />,
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
