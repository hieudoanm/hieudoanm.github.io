import image01 from '~/assets/renaissance/01.jpg';
import image02 from '~/assets/renaissance/02.jpg';
import image03 from '~/assets/renaissance/03.jpg';
import image04 from '~/assets/renaissance/04.jpg';
import image05 from '~/assets/renaissance/05.jpg';
import image06 from '~/assets/renaissance/06.jpg';
import image07 from '~/assets/renaissance/07.jpg';
import image08 from '~/assets/renaissance/08.jpg';
import image09 from '~/assets/renaissance/09.jpg';
import image10 from '~/assets/renaissance/10.jpg';
import image11 from '~/assets/renaissance/11.jpg';
import image12 from '~/assets/renaissance/12.jpg';
import image13 from '~/assets/renaissance/13.jpg';
import image14 from '~/assets/renaissance/14.jpg';
import image15 from '~/assets/renaissance/15.jpg';
import image16 from '~/assets/renaissance/16.jpg';
import image17 from '~/assets/renaissance/17.jpg';
import image18 from '~/assets/renaissance/18.jpg';
import { createSignal } from 'solid-js';

export const WidgetPhotos = () => {
  const images: string[] = [
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

  const randomIndex: number = Math.floor(Math.random() * images.length);
  const randomImage: string = images[randomIndex];

  const [image, setImage] = createSignal(randomImage);

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-2">
        <button
          class="h-full w-full overflow-hidden rounded-2xl bg-cover bg-center grayscale"
          style={{ 'background-image': `url(${image()})` }}
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            const randomImage = images[randomIndex];
            setImage(randomImage);
          }}></button>
      </div>
    </div>
  );
};
