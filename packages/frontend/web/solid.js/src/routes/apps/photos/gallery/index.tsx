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

const GalleryPage = () => {
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12">
      {images.map((image, index) => {
        return (
          <div title={`image${index.toString()}`} class="col-span-1">
            <div
              class="aspect-square w-full bg-cover bg-center bg-no-repeat grayscale transition-all duration-300 hover:grayscale-0"
              style={{ 'background-image': `url(${image})` }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryPage;
