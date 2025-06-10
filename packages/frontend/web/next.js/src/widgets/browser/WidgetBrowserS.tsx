import { FaBrave, FaFirefox, FaGoogle, FaSafari } from 'react-icons/fa6';

export const WidgetBrowsers = () => {
  const icons = [
    <FaBrave key="brave" />,
    <FaFirefox key="firefox" />,
    <FaGoogle key="google" />,
    <FaSafari key="safari" />,
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="flex h-full w-full flex-col px-8 py-6">
        <div className="grid grid-cols-2 items-center pb-2">
          <div className="col-span-1">
            <h1 className="text-center font-black">Browsers</h1>
          </div>
          <div className="col-span-1">
            <p className="text-center text-sm">Default</p>
          </div>
        </div>
        <div className="grid grow grid-cols-2">
          {icons.map((icon, index) => {
            return (
              <div key={'item' + index} className="col-span-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex aspect-square w-[75%] items-center justify-center rounded-full bg-white text-4xl text-black hover:bg-red-500 hover:text-neutral-100">
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
