import { NextPage } from 'next';
import { FaBookmark, FaClockRotateLeft, FaMask, FaPlus } from 'react-icons/fa6';

const BrowserPage: NextPage = () => {
  const icons = [
    <FaPlus key="new" />,
    <FaMask key="transfer" />,
    <FaBookmark key="bookmark" />,
    <FaClockRotateLeft key="history" />,
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="flex h-full w-full flex-col px-8 py-6">
            <div className="grid grid-cols-2 pb-2">
              <div className="col-span-1">
                <h1 className="text-center font-black">Browser</h1>
              </div>
              <div className="col-span-1">
                <p className="text-center text-sm">Firefox</p>
              </div>
            </div>
            <div className="grid grow grid-cols-2">
              {icons.map((icon, index) => {
                return (
                  <div key={'item' + index} className="col-span-1">
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="flex aspect-square w-[75%] items-center justify-center rounded-full bg-white text-4xl text-black hover:bg-red-500 hover:text-white">
                        {icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPage;
