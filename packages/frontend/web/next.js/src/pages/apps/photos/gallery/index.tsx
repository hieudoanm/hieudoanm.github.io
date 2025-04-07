import { NextPage } from 'next';
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

const GalleryPage: NextPage = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12">
      {images.map((image, index) => {
        return (
          <div key={`image${index.toString()}`} className="col-span-1">
            <div
              className="aspect-square w-full bg-cover bg-center bg-no-repeat grayscale transition-all duration-300 hover:grayscale-0"
              style={{ backgroundImage: `url(${image.src})` }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryPage;
