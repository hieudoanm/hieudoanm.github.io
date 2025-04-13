import monet01 from '@web/assets/images/impressionism/monet/01.jpg';
import monet02 from '@web/assets/images/impressionism/monet/02.jpg';
import monet03 from '@web/assets/images/impressionism/monet/03.jpg';
import monet04 from '@web/assets/images/impressionism/monet/04.jpg';
import monet05 from '@web/assets/images/impressionism/monet/05.jpg';
import monet06 from '@web/assets/images/impressionism/monet/06.jpg';
import monet07 from '@web/assets/images/impressionism/monet/07.jpg';
import vanGogh01 from '@web/assets/images/impressionism/van-gogh/01.jpg';
import vanGogh02 from '@web/assets/images/impressionism/van-gogh/02.jpg';
import vanGogh03 from '@web/assets/images/impressionism/van-gogh/03.jpg';
import vanGogh04 from '@web/assets/images/impressionism/van-gogh/04.jpg';
import vanGogh05 from '@web/assets/images/impressionism/van-gogh/05.jpg';
import vanGogh06 from '@web/assets/images/impressionism/van-gogh/06.jpg';
import kitsch01 from '@web/assets/images/kitsch/01.png';
import church01 from '@web/assets/images/renaissance/churches/01.jpg';
import church02 from '@web/assets/images/renaissance/churches/02.jpg';
import church03 from '@web/assets/images/renaissance/churches/03.jpg';
import church04 from '@web/assets/images/renaissance/churches/04.jpg';
import church05 from '@web/assets/images/renaissance/churches/05.jpg';
import church06 from '@web/assets/images/renaissance/churches/06.jpg';
import church07 from '@web/assets/images/renaissance/churches/07.jpg';
import daVinci01 from '@web/assets/images/renaissance/da-vinci/01.jpg';
import daVinci02 from '@web/assets/images/renaissance/da-vinci/02.jpg';
import daVinci03 from '@web/assets/images/renaissance/da-vinci/03.jpg';
import daVinci04 from '@web/assets/images/renaissance/da-vinci/04.jpg';
import daVinci05 from '@web/assets/images/renaissance/da-vinci/05.jpg';
import daVinci06 from '@web/assets/images/renaissance/da-vinci/06.jpg';
import daVinci07 from '@web/assets/images/renaissance/da-vinci/07.jpg';
import daVinci08 from '@web/assets/images/renaissance/da-vinci/08.jpg';
import daVinci09 from '@web/assets/images/renaissance/da-vinci/09.jpg';
import michelangelo01 from '@web/assets/images/renaissance/michelangelo/01.jpg';
import michelangelo02 from '@web/assets/images/renaissance/michelangelo/02.jpg';
import michelangelo03 from '@web/assets/images/renaissance/michelangelo/03.jpg';
import michelangelo04 from '@web/assets/images/renaissance/michelangelo/04.jpg';
import michelangelo05 from '@web/assets/images/renaissance/michelangelo/05.jpg';
import michelangelo06 from '@web/assets/images/renaissance/michelangelo/06.jpg';
import michelangelo07 from '@web/assets/images/renaissance/michelangelo/07.jpg';
import michelangelo08 from '@web/assets/images/renaissance/michelangelo/08.jpg';
import michelangelo09 from '@web/assets/images/renaissance/michelangelo/09.jpg';
import michelangelo10 from '@web/assets/images/renaissance/michelangelo/10.jpg';
import michelangelo11 from '@web/assets/images/renaissance/michelangelo/11.jpg';
import michelangelo12 from '@web/assets/images/renaissance/michelangelo/12.jpg';
import michelangelo13 from '@web/assets/images/renaissance/michelangelo/13.jpg';
import michelangelo14 from '@web/assets/images/renaissance/michelangelo/14.jpg';
import michelangelo15 from '@web/assets/images/renaissance/michelangelo/15.jpg';
import michelangelo16 from '@web/assets/images/renaissance/michelangelo/16.jpg';
import michelangelo17 from '@web/assets/images/renaissance/michelangelo/17.jpg';
import michelangelo18 from '@web/assets/images/renaissance/michelangelo/18.jpg';
import michelangelo19 from '@web/assets/images/renaissance/michelangelo/19.jpg';
import michelangelo20 from '@web/assets/images/renaissance/michelangelo/20.jpg';
import michelangelo21 from '@web/assets/images/renaissance/michelangelo/21.jpg';
import michelangelo22 from '@web/assets/images/renaissance/michelangelo/22.jpg';
import michelangelo23 from '@web/assets/images/renaissance/michelangelo/23.jpg';
import michelangelo24 from '@web/assets/images/renaissance/michelangelo/24.jpg';
import michelangelo25 from '@web/assets/images/renaissance/michelangelo/25.jpg';
import michelangelo26 from '@web/assets/images/renaissance/michelangelo/26.jpg';
import { useState } from 'react';

export const WidgetPhotos = () => {
  const images = [
    monet01,
    monet02,
    monet03,
    monet04,
    monet05,
    monet06,
    monet07,
    vanGogh01,
    vanGogh02,
    vanGogh03,
    vanGogh04,
    vanGogh05,
    vanGogh06,
    kitsch01,
    church01,
    church02,
    church03,
    church04,
    church05,
    church06,
    church07,
    daVinci01,
    daVinci02,
    daVinci03,
    daVinci04,
    daVinci05,
    daVinci06,
    daVinci07,
    daVinci08,
    daVinci09,
    michelangelo01,
    michelangelo02,
    michelangelo03,
    michelangelo04,
    michelangelo05,
    michelangelo06,
    michelangelo07,
    michelangelo08,
    michelangelo09,
    michelangelo10,
    michelangelo11,
    michelangelo12,
    michelangelo13,
    michelangelo14,
    michelangelo15,
    michelangelo16,
    michelangelo17,
    michelangelo18,
    michelangelo19,
    michelangelo20,
    michelangelo21,
    michelangelo22,
    michelangelo23,
    michelangelo24,
    michelangelo25,
    michelangelo26,
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
