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
import image19 from '@web/assets/renaissance/19.jpg';
import image20 from '@web/assets/renaissance/20.jpg';
import image21 from '@web/assets/renaissance/21.jpg';
import image22 from '@web/assets/renaissance/22.jpg';
import image23 from '@web/assets/renaissance/23.jpg';
import image24 from '@web/assets/renaissance/24.jpg';
import image25 from '@web/assets/renaissance/25.jpg';
import image26 from '@web/assets/renaissance/26.jpg';
import image27 from '@web/assets/renaissance/27.jpg';
import image28 from '@web/assets/renaissance/28.jpg';
import image29 from '@web/assets/renaissance/29.jpg';
import image30 from '@web/assets/renaissance/30.jpg';
import image31 from '@web/assets/renaissance/31.jpg';
import image32 from '@web/assets/renaissance/32.jpg';
import image33 from '@web/assets/renaissance/33.jpg';
import image34 from '@web/assets/renaissance/34.jpg';
import image35 from '@web/assets/renaissance/35.jpg';
import image36 from '@web/assets/renaissance/36.jpg';
import image37 from '@web/assets/renaissance/37.jpg';
import image38 from '@web/assets/renaissance/38.jpg';
import image39 from '@web/assets/renaissance/39.jpg';
import image40 from '@web/assets/renaissance/40.jpg';
import image41 from '@web/assets/renaissance/41.jpg';
import image42 from '@web/assets/renaissance/42.jpg';
import image43 from '@web/assets/renaissance/43.jpg';
import image44 from '@web/assets/renaissance/44.jpg';
import image45 from '@web/assets/renaissance/45.jpg';
import image46 from '@web/assets/renaissance/46.jpg';
import image47 from '@web/assets/renaissance/47.jpg';
import image48 from '@web/assets/renaissance/48.jpg';
import image49 from '@web/assets/renaissance/49.jpg';
import image50 from '@web/assets/renaissance/50.jpg';
import image51 from '@web/assets/renaissance/51.jpg';
import image52 from '@web/assets/renaissance/52.jpg';
import image53 from '@web/assets/renaissance/53.jpg';
import image54 from '@web/assets/renaissance/54.jpg';
import image55 from '@web/assets/renaissance/55.jpg';
import image56 from '@web/assets/renaissance/56.jpg';
import image57 from '@web/assets/renaissance/57.jpg';
import image58 from '@web/assets/renaissance/58.jpg';
import image59 from '@web/assets/renaissance/59.jpg';
import image60 from '@web/assets/renaissance/60.jpg';

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
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image34,
    image35,
    image36,
    image37,
    image38,
    image39,
    image40,
    image41,
    image42,
    image43,
    image44,
    image45,
    image46,
    image47,
    image48,
    image49,
    image50,
    image51,
    image52,
    image53,
    image54,
    image55,
    image56,
    image57,
    image58,
    image59,
    image60,
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
