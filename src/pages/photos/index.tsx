import { NextPage } from 'next';
import image from '@nothing/assets/image.jpg';

const PhotosPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-2">
            <div
              className="h-full w-full overflow-hidden rounded-2xl bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${image.src})` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
