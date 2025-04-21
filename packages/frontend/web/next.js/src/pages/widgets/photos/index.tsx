import { images } from '@web/assets/images';
import { WidgetPhotos } from '@web/widgets/photos/WidgetPhotos';
import { NextPage } from 'next';
import { useState } from 'react';
import { FaMinimize } from 'react-icons/fa6';

const PhotosPage: NextPage = () => {
  const [{ full }, setState] = useState<{ full: boolean }>({ full: false });
  return (
    <>
      {!full && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-10 h-full w-full overflow-hidden bg-gray-100">
          <div className="flex h-full items-center justify-center">
            <button
              type="button"
              className="w-full max-w-60 cursor-pointer"
              onClick={() => {
                setState({ full: true });
              }}>
              <WidgetPhotos />
            </button>
          </div>
        </div>
      )}
      {full && (
        <button
          className="fixed top-4 right-4 z-10 cursor-pointer rounded-full bg-gray-900 p-4"
          onClick={() => {
            setState({ full: false });
          }}>
          <FaMinimize />
        </button>
      )}
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
    </>
  );
};

export default PhotosPage;
