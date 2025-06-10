import { FaCamera } from 'react-icons/fa6';

export const WidgetTranslate = () => {
  const icons = [
    <p key="languages" className="font-semibold">
      English to Korean
    </p>,
    <FaCamera key="security" className="text-3xl" />,
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="flex h-full w-full flex-col px-8 py-8">
        <div className="pb-8">
          <p className="text-center font-black">Translate</p>
        </div>
        <div className="grid grow grid-cols-2 gap-y-8">
          {icons.map((icon, index) => {
            return (
              <div key={'item' + index} className="col-span-2">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-neutral-100">
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
