import { NextPage } from 'next';
import { FaPhone, FaPlus, FaStar, FaVoicemail } from 'react-icons/fa6';

const PhonePage: NextPage = () => {
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black">
          <div className="h-full w-full p-8">
            <div className="grid h-full grid-cols-4">
              {items.map((item, index) => {
                return (
                  <div
                    key={'item-' + index}
                    className="col-span-1 flex h-full items-center justify-center">
                    <div className="flex aspect-square w-12 items-center justify-center rounded-full bg-white font-black text-black hover:bg-red-500 hover:text-white">
                      {item}
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

export default PhonePage;
