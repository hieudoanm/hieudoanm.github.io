import image01 from '@web/assets/renaissance/01.jpg';
import image02 from '@web/assets/renaissance/02.jpg';
import image03 from '@web/assets/renaissance/03.jpg';
import image04 from '@web/assets/renaissance/04.jpg';
import image05 from '@web/assets/renaissance/05.jpg';
import image06 from '@web/assets/renaissance/06.jpg';
import image07 from '@web/assets/renaissance/07.jpg';
import image08 from '@web/assets/renaissance/08.jpg';
import image09 from '@web/assets/renaissance/09.jpg';
import image10 from '@web/assets/renaissance/10.jpg';
import image11 from '@web/assets/renaissance/11.jpg';
import image12 from '@web/assets/renaissance/12.jpg';
import image13 from '@web/assets/renaissance/13.jpg';
import image14 from '@web/assets/renaissance/14.jpg';
import image15 from '@web/assets/renaissance/15.jpg';
import image16 from '@web/assets/renaissance/16.jpg';
import image17 from '@web/assets/renaissance/17.jpg';
import image18 from '@web/assets/renaissance/18.jpg';
import { useState } from 'react';

export const WidgetPhotos = () => {
  const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
    image08,
    image09,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  const [image, setImage] = useState(randomImage);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div className="h-full w-full p-2">
        <button
          className="h-full w-full overflow-hidden rounded-2xl bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${image.src})` }}
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            const randomImage = images[randomIndex];
            setImage(randomImage);
          }}></button>
      </div>
    </div>
  );
};
