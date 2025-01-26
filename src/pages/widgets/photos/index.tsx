import { WidgetPhotos } from '@nothing/widgets/photos/WidgetPhotos';
import { NextPage } from 'next';

const PhotosPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetPhotos />
      </div>
    </div>
  );
};

export default PhotosPage;
