import { FC } from 'react';
import {
  FaFileWord,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileImage,
} from 'react-icons/fa6';

export const WidgetFiles: FC = () => {
  const icons = [
    { icon: <FaFileWord key="word" />, name: 'docs' },
    { icon: <FaFilePowerpoint key="power-point" />, name: 'slides' },
    { icon: <FaFileVideo key="video" />, name: 'video' },
    { icon: <FaFileImage key="image" />, name: 'image' },
  ];

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="flex h-full w-full flex-col px-8 py-6">
        <div className="grid grid-cols-2 pb-2">
          <div className="col-span-1">
            <h1 className="text-center font-black">Files</h1>
          </div>
          <div className="col-span-1">
            <p className="text-center text-sm">Recent</p>
          </div>
        </div>
        <div className="grid grow grid-cols-2">
          {icons.map(({ icon, name }, index) => {
            return (
              <div key={'item' + index} className="col-span-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-5xl">{icon}</p>
                    <p className="text-center">{name}</p>
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
