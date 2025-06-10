import { images } from '@web/assets/images';
import { ONE_SECOND } from '@web/utils/time';
import { FC, useEffect, useState } from 'react';

export const WidgetPhotos: FC = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((previous) => (previous + 1) % images.length);
    }, 5 * ONE_SECOND);

    return () => clearInterval(interval);
  });

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-neutral-900 text-neutral-100">
      <div className="h-full w-full p-2">
        <div
          className="h-full w-full overflow-hidden rounded-2xl bg-cover bg-center grayscale transition-all"
          style={{
            backgroundImage: `url(${images.at(imageIndex % images.length)?.src})`,
          }}
        />
      </div>
    </div>
  );
};
